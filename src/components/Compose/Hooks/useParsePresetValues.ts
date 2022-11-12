import * as global from 'constants/globalConstants'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { IComposeEmailReceive } from 'store/storeTypes/composeTypes'
import { handleContactConversion } from 'utils/convertToContact'
import parseQueryString from 'utils/parseQueryString'

/**
 * @function handlePresetvalueConversions
 * @param presetValueObject
 * @returns an object ready to be ingested into composeEmail state
 */
const handlePresetvalueConversions = (
  presetValueObject: IComposeEmailReceive
) => {
  const convertedPresetValueObject: any = {}
  if (
    'id' in presetValueObject &&
    presetValueObject.id &&
    presetValueObject.id.length > 0
  ) {
    convertedPresetValueObject.id = presetValueObject.id
  }
  if (
    'threadId' in presetValueObject &&
    presetValueObject.threadId &&
    presetValueObject.threadId.length > 0
  ) {
    convertedPresetValueObject.threadId = presetValueObject.threadId
  }
  if (presetValueObject?.to && presetValueObject.to.length > 0) {
    convertedPresetValueObject.to =
      typeof presetValueObject.to === 'string'
        ? handleContactConversion(presetValueObject.to)
        : presetValueObject.to
  }
  if (presetValueObject?.cc && presetValueObject.cc.length > 0) {
    convertedPresetValueObject.cc =
      typeof presetValueObject.cc === 'string'
        ? handleContactConversion(presetValueObject.cc)
        : presetValueObject.cc
  }
  if (presetValueObject?.bcc && presetValueObject.bcc.length > 0) {
    convertedPresetValueObject.cc =
      typeof presetValueObject.bcc === 'string'
        ? handleContactConversion(presetValueObject.bcc)
        : presetValueObject.bcc
  }
  if ('subject' in presetValueObject) {
    convertedPresetValueObject.subject = presetValueObject.subject
  }
  if ('body' in presetValueObject) {
    convertedPresetValueObject.body = presetValueObject.body
  }
  if (presetValueObject?.files && presetValueObject.files.length > 0) {
    convertedPresetValueObject.files = presetValueObject.files
  }
  return convertedPresetValueObject
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
  setComposedEmail: Dispatch<SetStateAction<any>>
  setLoadState: Dispatch<SetStateAction<string>>
  loadState: string
  presetValueObject?: IComposeEmailReceive
}) {
  // Set the form values that come either from the location state, the URL, or passed props.
  useEffect(() => {
    let mounted = true
    if (mounted && loadState === global.LOAD_STATE_MAP.idle) {
      // composeEmail object coming from the passed props
      if (presetValueObject) {
        const output = handlePresetvalueConversions(presetValueObject)
        if ('cc' in output) {
          setShowCC(true)
        }
        if ('bcc' in output) {
          setShowBCC(true)
        }
        setComposedEmail(output)
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
    }
    return () => {
      mounted = false
    }
  }, [loadState])
}
