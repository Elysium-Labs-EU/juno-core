import AutoLinker from 'autolinker'
import {
  IAttachment,
  IEmailAttachmentType,
} from '../components/EmailDetail/Attachment/EmailAttachmentTypes'
import { decodeBase64 } from './decodeBase64'
import fetchAttachment from './fetchAttachment'

let decodedString: string | null = ''
let localMessageId: string | null = ''
let localDecodeImage: boolean | undefined = false
let decodedResult: any[] = []

const enhancePlainText = (localString: string) => {
  const enhancedText = () => {
    const lineBreakRegex = /(?:\r\n|\r|\n)/g
    return (
      AutoLinker.link(localString, { email: false }).replace(
        lineBreakRegex,
        '<br>'
      ) ?? ''
    )
  }
  return enhancedText()
}

const inlineImageDecoder = async ({
  attachmentData,
  messageId,
}: {
  messageId: string
  attachmentData: IEmailAttachmentType
}) => {
  const response = await fetchAttachment({ attachmentData, messageId })
  if (response) {
    return response
  }
  return null
}

// This function recursively loops in the emailbody to find a body to decode. If initially priotizes the last object in a parts array.
export const loopThroughBodyParts = async ({
  inputObject,
}: {
  inputObject: any
}): Promise<any> => {
  const objectKeys = Object.keys(inputObject)
  for (let i = 0; i < objectKeys.length; i += 1) {
    if (objectKeys[i] === 'body' || objectKeys[i] === 'parts') {
      if (inputObject.body.size > 0) {
        if (objectKeys[i] === 'body') {
          if (
            Object.prototype.hasOwnProperty.call(
              inputObject.body,
              'attachmentId'
            ) &&
            localDecodeImage &&
            localMessageId
          ) {
            // If it is an image, use the image decoder
            const imageObjectPromise = inlineImageDecoder({
              attachmentData: inputObject,
              messageId: localMessageId,
            })
            decodedResult.push(imageObjectPromise)
          }
          decodedString = decodeBase64(`${inputObject.body.data}`)
          if (inputObject.mimeType !== 'text/plain' && decodedString) {
            decodedResult.push(decodedString)
          } else if (inputObject.mimeType === 'text/plain' && decodedString) {
            const localString = decodedString
            decodedResult.push(enhancePlainText(localString))
          }
        }
      }
      if (
        inputObject.body.size === 0 ||
        !Object.prototype.hasOwnProperty.call(inputObject, 'body')
      ) {
        if (objectKeys[i] === 'parts') {
          if (
            Object.prototype.hasOwnProperty.call(inputObject.parts[0], 'parts')
          ) {
            if (inputObject.parts.length > 1) {
              if (
                Object.prototype.hasOwnProperty.call(
                  inputObject.parts[1],
                  'body'
                ) ||
                Object.prototype.hasOwnProperty.call(
                  inputObject.parts[1].body,
                  'attachmentId'
                )
              ) {
                loopThroughBodyParts({
                  inputObject: inputObject.parts[1],
                })
              }
              return loopThroughBodyParts({
                inputObject: inputObject.parts[0],
              })
            }
          }
          if (inputObject.parts.length > 1) {
            // If the object has parts of its own, loop through those.
            if (
              Object.prototype.hasOwnProperty.call(
                inputObject.parts[1],
                'parts'
              )
            ) {
              return loopThroughBodyParts({
                inputObject: inputObject.parts[1],
              })
            }
            // If the object has no parts of its own, loop through all of them to decode
            inputObject.parts.forEach((part: any) => {
              loopThroughBodyParts({
                inputObject: part,
              })
            })
          } else {
            return loopThroughBodyParts({
              inputObject: inputObject.parts[0],
            })
          }
        }
      }
    }
  }
  return Promise.all(decodedResult)
}

// Prioritise the string object that has the HTML tag in it. Remove the others.
// First understand how many string objects there are, if more than 1, than filter out the lesser valued ones.
const prioritizeHTMLbodyObject = (response: any) => {
  const indexOfStringObjects: number[] = []
  for (let i = 0; i < response.length; i += 1) {
    if (typeof response[i] === 'string' && !response[i].includes('html>')) {
      indexOfStringObjects.push(i)
    }
  }
  if (indexOfStringObjects.length === 0) {
    return response
  }
  if (indexOfStringObjects.length === 1) {
    response.splice(indexOfStringObjects[0], 1)
    return response
  }
  // Filter out all the items that are a string, but do not have HTML
  return response.filter(
    (item: any) => typeof item === 'string' && !item.includes('html>')
  )
}

// Check the string body for CID (files) if there is a match, replace the img tag with the fetched file
const placeInlineImage = (objectWithPriotizedHTML: any) => {
  const stringOnly = objectWithPriotizedHTML.filter(
    (item: any) => typeof item === 'string'
  )[0]
  const objectOnly: IAttachment[] = objectWithPriotizedHTML.filter(
    (item: any) => typeof item === 'object'
  )
  if (objectOnly.length > 0) {
    let outputString = ''
    const remainingObjectArray: IAttachment[] = []
    for (let i = 0; i < objectOnly.length; i += 1) {
      const matchString = `cid:${objectOnly[i].contentID}`
      if (stringOnly.search(matchString) === -1) {
        remainingObjectArray.push(objectOnly[i])
      }
      if (outputString.length === 0) {
        outputString = stringOnly.replace(
          matchString,
          `data:${objectOnly[i].mimeType};base64,${objectOnly[i].decodedB64}`
        )
      } else {
        outputString = outputString.replace(
          matchString,
          `data:${objectOnly[i].mimeType};base64,${objectOnly[i].decodedB64}`
        )
      }
    }
    if (remainingObjectArray.length > 0) {
      return [
        ...remainingObjectArray.filter(
          (item) => item.mimeType !== 'application/octet-stream'
        ),
        outputString,
      ]
    }
    return [outputString]
  }
  return objectWithPriotizedHTML
}

const bodyDecoder = async ({
  messageId,
  inputObject,
  decodeImage,
}: {
  messageId?: string
  inputObject: any
  decodeImage: boolean
}) => {
  if (decodeImage) {
    localDecodeImage = decodeImage
  }
  if (messageId) {
    localMessageId = messageId
  }
  const response = await loopThroughBodyParts({
    inputObject,
  })

  console.log(response)

  decodedResult = []
  if (response.length === 1 && typeof response[0] !== 'object') {
    return response
  }
  return placeInlineImage(prioritizeHTMLbodyObject(response))
}

export default bodyDecoder
