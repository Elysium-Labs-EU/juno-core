import { decodeBase64 } from './decodeBase64'

let localInlineImageDecoder: Function = () => {}
let decodedString: string | null = ''
// This function recursively loops in the emailbody to find a body to decode. If initially priotizes the last object in a parts array.
const bodyDecoder = ({
  inputObject,
  inlineImageDecoder,
}: {
  inputObject: any
  inlineImageDecoder?: Function
}): string[] => {
  if (inlineImageDecoder) {
    localInlineImageDecoder = inlineImageDecoder
  }
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
            localInlineImageDecoder
          ) {
            // If it is an image, use the imported function to continue line of operation.
            localInlineImageDecoder(inputObject)
          } else {
            decodedString = decodeBase64(`${inputObject.body.data}`)
            if (inputObject.mimeType === 'text/plain' && decodedString) {
              const localString = decodedString
              const enhancedText = () => {
                const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g
                const lineBreakRegex = /(?:\r\n|\r|\n)/g
                return (
                  localString
                    ?.replace(urlRegex, (url) => {
                      let hyperlink = url
                      if (!hyperlink.match('^https?://')) {
                        hyperlink = `https://${hyperlink}`
                      }
                      return `<a href="${hyperlink}" target="_blank" rel="noopener noreferrer">${url}</a>`
                    })
                    .replace(lineBreakRegex, '<br>') ?? ''
                )
              }
              return [enhancedText()]
            }
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
                bodyDecoder({ inputObject: inputObject.parts[1] })
              }
              return bodyDecoder({ inputObject: inputObject.parts[0] })
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
              return bodyDecoder({ inputObject: inputObject.parts[1] })
            }
            // If the object has no parts of its own, loop through all of them to decode
            inputObject.parts.forEach((part: any) => {
              console.log(part)
              bodyDecoder({
                inputObject: part,
              })
            })
          } else {
            return bodyDecoder({ inputObject: inputObject.parts[0] })
          }
        }
      }
    }
  }
  return [decodedString ?? '']
}

export default bodyDecoder
