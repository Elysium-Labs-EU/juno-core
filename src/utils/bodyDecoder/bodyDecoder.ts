/* eslint-disable no-restricted-syntax */
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
import { IEmailMessagePayload } from '../../store/storeTypes/emailListTypes'

let decodedString: string | undefined = ''
let localMessageId: string | null = ''
let localDecodeImage: boolean | undefined = false
let decodedResult: any[] = []

/**
 * @function enhancePlainText
 * @param localString a plain text string that needs to be enhanced.
 * @returns it will return a string that has been line "breaked" and has activated links.
 */

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

/**
 * @function inlineImageDecoder
 * @property {object} params - parameter object that contains the relevant id of the message and the object with attachment data.
 * @returns returns a response based on an API call to fetch the attachment base64 data, or null if the response is not available.
 */

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
/**
 * @function loopThroughBodyParts
 * @param {object} params - parameter object that contains an inputObject and an abort signal. The inputObject can be of type IEmailMessage or IEmailMessagePayload
 * @returns
 */
export const loopThroughBodyParts = async ({
  inputObject,
  signal,
}: {
  inputObject: IEmailMessagePayload
  signal: AbortSignal
}): Promise<any> => {
  if (signal.aborted) {
    throw new Error(signal.reason)
  }
  const loopingFunction = async ({
    loopObject,
  }: {
    loopObject: IEmailMessagePayload
  }) => {
    try {
      const objectKeys = Object.keys(loopObject)
      for (const objectKey of objectKeys) {
        if (objectKey === 'body') {
          if (loopObject.body.size > 0) {
            if (
              loopObject.body?.attachmentId &&
              loopObject.body?.data &&
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
            } else if (loopObject.mimeType === 'text/plain' && decodedString) {
              const localString = decodedString
              decodedResult.push(enhancePlainText(localString))
            }
          }
        }
        if (objectKey === 'parts') {
          if (
            (loopObject.body.size === 0 ||
              !Object.prototype.hasOwnProperty.call(loopObject, 'body')) &&
            loopObject?.parts
          ) {
            // If the object has parts of its own, loop through all of them to decode
            loopObject.parts.forEach((part) => {
              loopingFunction({
                loopObject: part,
              })
            })
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

/**
 * @function orderArrayPerType
 * @param response - an array that can contain objects and strings
 * @returns {object} that contains the all the strings in an array as the emailHTML, and all the objects in the array as emailFileHTML
 */

export const orderArrayPerType = (
  response: Array<string | IAttachment>
): { emailHTML: string[]; emailFileHTML: IAttachment[] } => {
  const firstStringOnly: string[] = []
  const objectOnly: IAttachment[] = []
  for (const item of response) {
    if (typeof item === 'string') {
      firstStringOnly.push(item)
    }
    if (typeof item === 'object') {
      objectOnly.push(item)
    }
  }
  return { emailHTML: firstStringOnly, emailFileHTML: objectOnly }
}

/**
 * @function prioritizeHTMLbodyObject
 * Prioritise the string object that has the HTML tag in it, ignore the others.
 * @param response - takes in the response, as an array of objects and strings
 * @returns if the param object only contains one string, return that. If not, it attempts to find the most html rich string.
 */

export const prioritizeHTMLbodyObject = (response: {
  emailHTML: string[]
  emailFileHTML: IAttachment[]
}) => {
  const htmlObjects: string[] = []
  const noHtmlObjects: string[] = []

  if (response.emailHTML.length === 1) {
    return response
  }
  if (response.emailHTML.length > 1) {
    for (const item of response.emailHTML) {
      if (item.includes('</html>')) {
        htmlObjects.push(item)
      } else if (item.startsWith('<')) {
        noHtmlObjects.push(item)
      } else {
        noHtmlObjects.push(item)
      }
    }
  }

  if (htmlObjects.length > 0) {
    return { ...response, emailHTML: htmlObjects }
  }
  return { ...response, emailHTML: noHtmlObjects }
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
    for (const emailFileHTML of orderedObject.emailFileHTML) {
      const matchString = `cid:${emailFileHTML.contentID}`

      // If the contentId of the object is not found in the string (emailbody) it should not be removed.
      if (orderedObject.emailHTML?.search(matchString) === -1) {
        remainingObjectArray.push(emailFileHTML)
      }
      // Of the first loop, instantiate the outputString. On next runs use that string.
      if (outputString !== undefined && outputString.length === 0) {
        outputString = orderedObject.emailHTML?.replace(
          matchString,
          `data:${emailFileHTML.mimeType};base64,${emailFileHTML.decodedB64}`
        )
      } else {
        outputString = outputString.replace(
          matchString,
          `data:${emailFileHTML.mimeType};base64,${emailFileHTML.decodedB64}`
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

/**
 * @function bodyDecoder
 * @property {object} - object can contain messageId and should contain inputObject, decodeImage, and signals
 * @param messageId - takes in messageId to understand which message is being decoded
 * @param inputObject -  an object from the Gmail API, that is the message object
 * @param decodeImage - a boolean, to see if the the input object should be decoded with the decodeImage function
 * @param signal - an abort signal object to cancel the decoding process, if needed
 * @returns a promise that resolves with the decoded email object, sorted on emailHTML and emailFileHTML, and showing which trackers have been removed from the email.
 */

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

    // orderArrayPerType changes the response object into an object that can hold two objects: emailHTML[], emailFileHTML[]
    response = orderArrayPerType(response)
    response = prioritizeHTMLbodyObject(response)
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
