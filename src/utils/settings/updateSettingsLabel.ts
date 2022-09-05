/* eslint-disable no-restricted-syntax */
import {
  SETTINGS_LABEL,
  SETTINGS_DELIMITER,
  showAvatarKeyMap,
  fetchSizeKeyMap,
  showIntroductionKeyMap,
  flexibleFlowKeyMap,
} from '../../constants/baseConstants'
import * as global from '../../constants/globalConstants'
import labelApi from '../../data/labelApi'
import { ISettingsObject } from './settingsTypes'

export const buildLabelString = (input: ISettingsObject) => {
  let newString = `${SETTINGS_LABEL}`
  for (const [key, value] of Object.entries(input)) {
    if (key === 'isAvatarVisible') {
      if (showAvatarKeyMap[value as any]) {
        newString += `${SETTINGS_DELIMITER + showAvatarKeyMap[value as any]}`
      } else {
        newString += `${SETTINGS_DELIMITER + value}`
      }
    }
    if (key === 'emailFetchSize') {
      if (fetchSizeKeyMap[value as any]) {
        newString += `${SETTINGS_DELIMITER + fetchSizeKeyMap[value as any]}`
      } else {
        newString += `${SETTINGS_DELIMITER + value}`
      }
    }
    if (key === 'showIntroduction') {
      if (showIntroductionKeyMap[value as any]) {
        newString += `${
          SETTINGS_DELIMITER + showIntroductionKeyMap[value as any]
        }`
      } else {
        newString += `${SETTINGS_DELIMITER + value}`
      }
    }
    if (key === 'isFlexibleFlowActive') {
      if (flexibleFlowKeyMap[value as any]) {
        newString += `${SETTINGS_DELIMITER + flexibleFlowKeyMap[value as any]}`
      } else {
        newString += `${SETTINGS_DELIMITER + value}`
      }
    }
  }
  return newString
}

const storeUpdatedSettingsLabel = ({ settingsLabelId, updatedString }: any) => {
  if (settingsLabelId) {
    labelApi().updateLabel({
      id: settingsLabelId,
      requestBody: { name: updatedString },
    })
  } else {
    throw Error('Cannot find settingsLabelId')
  }
}

interface IUpdateSettingsLabel {
  settingsLabelId: string | null
  fetchSize?: string
  showIntroduction?: boolean
  isAvatarVisible?: boolean
  isFlexibleFlowActive?: boolean
}

const updateSettingsLabel = async ({
  settingsLabelId,
  fetchSize,
  showIntroduction,
  isAvatarVisible,
  isFlexibleFlowActive,
}: IUpdateSettingsLabel) => {
  const foundSettings = localStorage.getItem(global.JUNO_SETTINGS_LOCAL)
  const parsedSettings = foundSettings ? JSON.parse(foundSettings) : undefined
  if (parsedSettings !== undefined) {
    if (fetchSize !== undefined) {
      const updatedObject = { ...parsedSettings, emailFetchSize: fetchSize }
      storeUpdatedSettingsLabel({
        settingsLabelId,
        updatedString: buildLabelString(updatedObject),
      })
    }
    if (showIntroduction !== undefined) {
      const updatedObject = {
        ...parsedSettings,
        showIntroduction,
      }
      storeUpdatedSettingsLabel({
        settingsLabelId,
        updatedString: buildLabelString(updatedObject),
      })
    }
    if (isAvatarVisible !== undefined) {
      const updatedObject = {
        ...parsedSettings,
        isAvatarVisible,
      }
      storeUpdatedSettingsLabel({
        settingsLabelId,
        updatedString: buildLabelString(updatedObject),
      })
    }
    if (isFlexibleFlowActive !== undefined) {
      const updatedObject = {
        ...parsedSettings,
        isFlexibleFlowActive,
      }
      storeUpdatedSettingsLabel({
        settingsLabelId,
        updatedString: buildLabelString(updatedObject),
      })
    }
  }
}

export default updateSettingsLabel
