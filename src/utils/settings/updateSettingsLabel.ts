/* eslint-disable no-restricted-syntax */
import {
  SETTINGS_LABEL,
  SETTINGS_DELIMITER,
  showAvatarKeyMap,
  emailFetchSizeKeyMap,
  showIntroductionKeyMap,
  flexibleFlowKeyMap,
  alternateActionsKeyMap,
} from 'constants/baseConstants'
import * as global from 'constants/globalConstants'
import labelApi from 'data/labelApi'
import type { AppDispatch } from 'store/store'
import { setSystemStatusUpdate } from 'store/utilsSlice'

import type { ISettingsObject } from './settingsTypes'

export const buildLabelString = (input: ISettingsObject) => {
  let newString = `${SETTINGS_LABEL}`
  const settingFunctions = {
    isAvatarVisible: (value: any) => {
      if (showAvatarKeyMap[value as any]) {
        newString += `${
          SETTINGS_DELIMITER +
          showAvatarKeyMap[value as keyof typeof showAvatarKeyMap]
        }`
      } else {
        newString += `${SETTINGS_DELIMITER + value}`
      }
    },
    showIntroduction: (value: any) => {
      if (showIntroductionKeyMap[value as any]) {
        newString += `${
          SETTINGS_DELIMITER +
          showIntroductionKeyMap[value as keyof typeof showIntroductionKeyMap]
        }`
      } else {
        newString += `${SETTINGS_DELIMITER + value}`
      }
    },
    isFlexibleFlowActive: (value: any) => {
      if (flexibleFlowKeyMap[value as any]) {
        newString += `${
          SETTINGS_DELIMITER +
          flexibleFlowKeyMap[value as keyof typeof flexibleFlowKeyMap]
        }`
      } else {
        newString += `${SETTINGS_DELIMITER + value}`
      }
    },
    alternateActions: (value: any) => {
      if (
        alternateActionsKeyMap[value as keyof typeof alternateActionsKeyMap]
      ) {
        newString += `${
          SETTINGS_DELIMITER +
          alternateActionsKeyMap[value as keyof typeof alternateActionsKeyMap]
        }`
      } else {
        newString += `${SETTINGS_DELIMITER + value}`
      }
    },
    emailFetchSize: (value: any) => {
      if (emailFetchSizeKeyMap[value as any]) {
        newString += `${
          SETTINGS_DELIMITER +
          emailFetchSizeKeyMap[value as keyof typeof emailFetchSizeKeyMap]
        }`
      } else {
        newString += `${SETTINGS_DELIMITER + value}`
      }
    },
  }

  for (const [key, value] of Object.entries(input)) {
    if (settingFunctions[key as keyof typeof settingFunctions]) {
      settingFunctions[key as keyof typeof settingFunctions](value)
    }
  }

  return newString
}

export interface IUpdateSettingsLabel {
  alternateActions?: string
  emailFetchSize?: string
  isAvatarVisible?: string
  isFlexibleFlowActive?: string
  settingsLabelId: string | null
  showIntroduction?: string
}

/**
 * @function parseSettingsLabel
 * @param {IUpdateSettingsLabel} param0 - An object containing the settings label ID and various settings to be parsed.
 * @returns {Object} - An object containing the updated settings label ID and a string representing the updated settings, or undefined if an error occurs.
 * @typedef IUpdateSettingsLabel
 * @property {string} settingsLabelId - The ID of the settings label to be updated.
 * @property {number} emailFetchSize - The fetch size to be set.
 * @property {boolean} showIntroduction - A flag indicating whether the introduction should be shown.
 * @property {boolean} isAvatarVisible - A flag indicating whether the avatar should be visible.
 * @property {boolean} isFlexibleFlowActive - A flag indicating whether the flexible flow is active.
 * @property {Object} alternateActions - An object containing alternate actions.
 */

export const parseSettingsLabel = ({
  settingsLabelId,
  emailFetchSize,
  showIntroduction,
  isAvatarVisible,
  isFlexibleFlowActive,
  alternateActions,
}: IUpdateSettingsLabel) => {
  try {
    const foundSettings = localStorage.getItem(global.JUNO_SETTINGS_LOCAL)
    const parsedSettings = foundSettings ? JSON.parse(foundSettings) : undefined
    if (parsedSettings !== undefined) {
      const updatedObject = { ...parsedSettings }
      if (emailFetchSize !== undefined) {
        updatedObject.emailFetchSize = emailFetchSize
      }
      if (showIntroduction !== undefined) {
        updatedObject.showIntroduction = showIntroduction
      }
      if (isAvatarVisible !== undefined) {
        updatedObject.isAvatarVisible = isAvatarVisible
      }
      if (isFlexibleFlowActive !== undefined) {
        updatedObject.isFlexibleFlowActive = isFlexibleFlowActive
      }
      if (alternateActions !== undefined) {
        updatedObject.alternateActions = alternateActions
      }
      return { settingsLabelId, updatedString: buildLabelString(updatedObject) }
    }
  } catch (err) {
    console.error('Unable to parse local settings')
  }
  return undefined
}

export const storeUpdatedSettingsLabel = async (
  input: ReturnType<typeof parseSettingsLabel>,
  dispatch: AppDispatch
) => {
  if (!input || !input?.settingsLabelId) {
    throw Error('Cannot find settingsLabelId')
  }

  const { settingsLabelId, updatedString } = input
  try {
    const response = await labelApi().updateLabel({
      id: settingsLabelId,
      requestBody: { name: updatedString },
    })
    if ('data' in response && response.data?.type !== 'user') {
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: 'Unable to store settings.',
        })
      )
    }
  } catch (err) {
    dispatch(
      setSystemStatusUpdate({
        type: 'error',
        message: 'Unable to store settings.',
      })
    )
  }
}
