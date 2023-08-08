import { useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import * as global from 'constants/globalConstants'
import type { ComposeEmailConverted, ComposeEmailReceive } from 'store/storeTypes/composeTypes'
import { ComposeEmailReceiveSchema } from 'store/storeTypes/composeTypes'
import { handleContactConversion } from 'utils/convertToContact'
import parseQueryString from 'utils/parseQueryString'

/**
 * @function handlePresetvalueConversions
 * @param presetValueObject
 * @returns an array ready to be ingested into composeEmail state, the structure is id: string, value: any where value is the value of the field.
 */
const handlePresetvalueConversions = (
  presetValueObject: ComposeEmailReceive
) => {
  const fieldsToConvert = [
    'id',
    'threadId',
    'to',
    'cc',
    'bcc',
    'subject',
    'body',
    'files',
  ]

  const convertedPresetValueArray = fieldsToConvert.reduce((acc, field) => {
    if (!(field in presetValueObject)) {
      return acc
    }
    if (field === 'to' || field === 'cc' || field === 'bcc') {
      let value = presetValueObject[field as keyof ComposeEmailReceive]

      if (value === undefined || value === null) {
        return acc
      }

      if (typeof value === 'string') {
        value = handleContactConversion(value)
      }

      const test = value

      acc.push({
        id: field,
        value: test,
      })
      return acc
    }
    return acc
  }, [] as Array<{ id: string; value: ComposeEmailConverted }>)

  // fieldsToConvert.forEach((field) => {
  //   if (field in presetValueObject) {
  //     let value = presetValueObject[field as keyof ComposeEmailReceive]
  //     if (field === 'to' || field === 'cc' || field === 'bcc') {
  //       if (typeof value === 'string') {
  //         value = handleContactConversion(value)
  //       }
  //     }
  //     convertedPresetValueArray.push({
  //       id: field,
  //       value,
  //     })
  //   }
  // })

  return convertedPresetValueArray
}

export default function useParsePresetValues({
  setShowCC,
  setShowBCC,
  setComposedEmail,
  setLoadState,
  loadState,
  presetValueObject = undefined,
}: {
  setShowCC: Dispatch<SetStateAction<boolean>>
  setShowBCC: Dispatch<SetStateAction<boolean>>
  setComposedEmail: Dispatch<SetStateAction<ReturnType<typeof handlePresetvalueConversions>>>
  setLoadState: Dispatch<SetStateAction<string>>
  loadState: string
  presetValueObject?: ComposeEmailReceive
}) {
  // Set the form values that come either from the location state, the URL, or passed props.
  useEffect(() => {
    if (loadState !== global.LOAD_STATE_MAP.idle) {
      return
    }
    // composeEmail object coming from the passed props
    if (presetValueObject) {
      if (ComposeEmailReceiveSchema.safeParse(presetValueObject).success) {
        const output = handlePresetvalueConversions(presetValueObject)
        if ('cc' in output) {
          setShowCC(true)
        }
        if ('bcc' in output) {
          setShowBCC(true)
        }
        setComposedEmail(output)
      }
    }
    // composeEmail object coming from a draft item on the draft list via the pushed route
    const {
      mailto,
      subject,
      body,
    }: { mailto?: string; subject?: string; body?: string } =
      parseQueryString(window.location.search, /[?&]/)
    if (mailto || subject || body) {
      const output = handlePresetvalueConversions({
        to: mailto?.includes('@')
          ? handleContactConversion(mailto)
          : undefined,
        subject,
        body,
      })
      setComposedEmail(output)
    }
    // After parsing the incoming data set the load state to Loaded
    setLoadState(global.LOAD_STATE_MAP.loaded)
  }, [loadState])
}
