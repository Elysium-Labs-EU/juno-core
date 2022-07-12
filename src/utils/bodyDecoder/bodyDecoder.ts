import AutoLinker from 'autolinker'
import DOMPurify from 'dompurify'
import {
  IAttachment,
  IEmailAttachmentType,
} from '../../components/EmailDetail/Attachment/EmailAttachmentTypes'
import { decodeBase64 } from '../decodeBase64'
import fetchAttachment from '../fetchAttachment'
import removeScripts from '../removeScripts'
import removeTrackers from '../removeTrackers'
import * as global from '../../constants/globalConstants'

let decodedString: string | undefined = ''
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
  signal,
}: {
  inputObject: any
  signal: AbortSignal
}): Promise<any> => {
  if (signal.aborted) {
    throw new Error(signal.reason)
  }
  const loopingFunction = async ({ loopObject }: { loopObject: any }) => {
    try {
      const objectKeys = Object.keys(loopObject)
      for (let i = 0; i < objectKeys.length; i += 1) {
        if (objectKeys[i] === 'body' || objectKeys[i] === 'parts') {
          if (loopObject.body.size > 0) {
            if (objectKeys[i] === 'body') {
              if (
                Object.prototype.hasOwnProperty.call(
                  loopObject.body,
                  'attachmentId'
                ) &&
                localDecodeImage &&
                localMessageId
              ) {
                // If it is an image, use the image decoder
                const imageObjectPromise = inlineImageDecoder({
                  attachmentData: loopObject,
                  messageId: localMessageId,
                })
                decodedResult.push(imageObjectPromise)
              }
              decodedString = decodeBase64(`${loopObject.body.data}`)
              if (loopObject.mimeType !== 'text/plain' && decodedString) {
                decodedResult.push(decodedString)
              } else if (
                loopObject.mimeType === 'text/plain' &&
                decodedString
              ) {
                const localString = decodedString
                decodedResult.push(enhancePlainText(localString))
              }
            }
          }
          if (
            loopObject.body.size === 0 ||
            !Object.prototype.hasOwnProperty.call(loopObject, 'body')
          ) {
            if (objectKeys[i] === 'parts') {
              // If the object has no parts of its own, loop through all of them to decode
              loopObject.parts.forEach((part: any) => {
                loopingFunction({
                  loopObject: part,
                })
              })
            }
          }
        }
      }
      if (!signal.aborted) {
        const result = await Promise.all(decodedResult)
        return result
      }
      return null
    } catch (err) {
      decodedResult = []
      const typedError: any = err
      return typedError
    }
  }
  return loopingFunction({ loopObject: inputObject })
}

const orderArrayPerType = (objectWithPriotizedHTML: any[]) => {
  const stringOnly: string | undefined = objectWithPriotizedHTML.filter(
    (item: any) => typeof item === 'string'
  )[0]
  const objectOnly: IAttachment[] = objectWithPriotizedHTML.filter(
    (item: any) => typeof item === 'object'
  )
  return { emailHTML: stringOnly, emailFileHTML: objectOnly }
}

// Prioritise the string object that has the HTML tag in it. Remove the others.
// First understand how many string objects there are, if more than 1, than filter out the lesser valued ones.
/**
 * @function prioritizeHTMLbodyObject
 * @param response - takes in the response, as a string
 * @returns if the param object only contains one string
 */
const prioritizeHTMLbodyObject = (response: Array<string | IAttachment>) => {
  const indexOfStringObjects: number[] = []
  const indexOfRemovalObjects: number[] = []
  for (let i = 0; i < response.length; i += 1) {
    // If the response is a string but doesn't have html, mark it for removal.
    // We need to run this first to understand how many string objects the response has.

    const r = response[i]
    if (typeof r === 'string' && !r.includes('</html>')) {
      indexOfRemovalObjects.push(i)
    }
    if (typeof response[i] === 'string') {
      indexOfStringObjects.push(i)
    }
  }
  // If there is only 1 string item in the response, use that.
  if (indexOfStringObjects.length === 1 && indexOfRemovalObjects.length === 1) {
    return response
  }
  if (indexOfStringObjects.length > indexOfRemovalObjects.length) {
    for (let i = indexOfRemovalObjects.length - 1; i >= 0; i -= 1) {
      response.splice(indexOfRemovalObjects[i], 1)
    }
    return response
  }
  // If none items are found, guess which item is the most valuable.
  const estimatedMostValuableItem: string[] = []
  for (let i = 0; response.length > i; i += 1) {
    const r = response[i]
    if (typeof r === 'string' && r.startsWith('<')) {
      estimatedMostValuableItem.push(r)
    }
  }
  return estimatedMostValuableItem
}

/**
 * @function placeInlineImage
 * @param orderedObject - check the string body for CID (files) if there is a match, replace the img tag with the fetched file.
 * @returns {Object} - an object with emailHTML and emailFileHTML
 */

// Check the string body for CID (files) if there is a match, replace the img tag with the fetched file
export const placeInlineImage = (orderedObject: {
  emailHTML: string
  emailFileHTML: IAttachment[]
}): { emailHTML: string; emailFileHTML: IAttachment[] } => {
  if (orderedObject.emailFileHTML.length > 0) {
    const localCopyOrderedObject = orderedObject
    let outputString = ''
    const remainingObjectArray: IAttachment[] = []
    for (let i = 0; i < orderedObject.emailFileHTML.length; i += 1) {
      const matchString = `cid:${orderedObject.emailFileHTML[i].contentID}`

      // If the contentId of the object is not found in the string (emailbody) it should not be removed.
      if (orderedObject.emailHTML?.search(matchString) === -1) {
        remainingObjectArray.push(orderedObject.emailFileHTML[i])
      }
      // Of the first loop, instantiate the outputString. On next runs use that string.
      if (outputString !== undefined && outputString.length === 0) {
        outputString = orderedObject.emailHTML?.replace(
          matchString,
          `data:${orderedObject.emailFileHTML[i].mimeType};base64,${orderedObject.emailFileHTML[i].decodedB64}`
        )
      } else {
        outputString = outputString.replace(
          matchString,
          `data:${orderedObject.emailFileHTML[i].mimeType};base64,${orderedObject.emailFileHTML[i].decodedB64}`
        )
      }
    }
    // Only set the output string, if the code above has ran for it.
    if (outputString && outputString.length > 0) {
      localCopyOrderedObject.emailHTML = outputString
    }
    // If there are attachment objects left, filter out the ones that cannot be displayed in html.
    localCopyOrderedObject.emailFileHTML = remainingObjectArray.filter(
      (item) => item.mimeType !== global.MIME_TYPE_NO_INLINE
    )
    return localCopyOrderedObject
  }
  return orderedObject
}

const bodyDecoder = async ({
  messageId,
  inputObject,
  decodeImage,
  signal,
}: {
  messageId?: string
  inputObject: any
  decodeImage: boolean
  signal: AbortSignal
}): Promise<{
  emailHTML: string
  emailFileHTML: any[]
  removedTrackers: Attr[] | []
}> => {
  try {
    if (decodeImage) {
      localDecodeImage = decodeImage
    }
    if (messageId) {
      localMessageId = messageId
    }
    let response = await loopThroughBodyParts({
      inputObject,
      signal,
    })
    // Reset the local variable for the next decode
    decodedResult = []

    response = prioritizeHTMLbodyObject(response)
    // orderArrayPerType changes the response object into an object that can hold two objects: emailHTML[], emailFileHTML[]
    response = orderArrayPerType(response)
    response = placeInlineImage(response)
    response = removeTrackers(response)
    response = removeScripts(response)
    response = {
      ...response,
      emailHTML: DOMPurify.sanitize(response.emailHTML, {
        USE_PROFILES: { html: true },
      }),
    }
    return response
  } catch (err) {
    const typedError: any = err
    return typedError
  }
}

export default bodyDecoder
