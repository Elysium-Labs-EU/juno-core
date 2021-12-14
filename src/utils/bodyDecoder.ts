import { decodeBase64 } from './decodeBase64'

const decodedBody: string[] = []

// This function recursively loops in the emailbody to find a body to decode.
const bodyDecoder = (inputObject: any): string[] => {
  const objectKeys = Object.keys(inputObject)
  for (let i: number = 0; i < objectKeys.length; i += 1) {
    if (objectKeys[i] === 'body' || objectKeys[i] === 'parts') {
      if (inputObject.body.size > 0) {
        if (objectKeys[i] === 'body') {
          //   if (
          //     Object.prototype.hasOwnProperty.call(
          //       inputObject.body,
          //       'attachmentId'
          //     )
          //   ) {
          //     inlineImage(inputObject)
          //   }
          const str = decodeBase64(`${inputObject.body.data}`)
          if (str) return [...decodedBody, str]
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
                ) &&
                Object.prototype.hasOwnProperty.call(
                  inputObject.parts[1].body,
                  'attachmentId'
                )
              ) {
                bodyDecoder(inputObject.parts[1])
              }
              return bodyDecoder(inputObject.parts[0])
            }
          }
          if (inputObject.parts.length > 1) {
            if (
              Object.prototype.hasOwnProperty.call(
                inputObject.parts[1],
                'parts'
              )
            ) {
              return bodyDecoder(inputObject.parts[1])
            }
          }
          if (inputObject.parts.length > 1) {
            if (
              Object.prototype.hasOwnProperty.call(
                inputObject.parts[1],
                'body'
              ) &&
              Object.prototype.hasOwnProperty.call(
                inputObject.parts[1].body,
                'attachmentId'
              )
            ) {
              bodyDecoder(inputObject.parts[0])
              return bodyDecoder(inputObject.parts[1])
            }
          }
          if (inputObject.parts.length > 1) {
            if (
              Object.prototype.hasOwnProperty.call(inputObject.parts[1], 'body')
            ) {
              return bodyDecoder(inputObject.parts[1])
            }
          }
        }
      }
    }
  }
  return decodedBody
}

export default bodyDecoder
