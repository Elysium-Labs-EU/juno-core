export const BASE_ARRAY = [
  'Juno',
  'Juno/To Do',
  // 'Juno/Keep',
  // 'Juno/Reminder',
  'INBOX',
  'SPAM',
  'DRAFT',
  'SENT',
]

export const SETTINGS_LABEL = 'Juno/'
export const SETTINGS_DELIMITER = '#'
export const AVAILABLE_SETTINGS = [
  'isAvatarVisible',
  'emailFetchSize',
  'isFlexibleFlowActive',
  'showIntroduction',
]

export const showAvatarMap: { [key: string]: boolean } = {
  SA0: false,
  SA1: true,
}
export const showAvatarKeyMap: { [key: string]: string } = {
  false: 'SA0',
  true: 'SA1',
}

export const fetchSizeMap: { [key: string]: number } = {
  FS20: 20,
  FS25: 25,
  FS30: 30,
}
export const fetchSizeKeyMap: { [key: number]: string } = {
  20: 'FS20',
  25: 'FS25',
  30: 'FS30',
}

export const flexibleFlowMap: { [key: string]: boolean } = {
  FF0: false,
  FF1: true,
}
export const flexibleFlowKeyMap: { [key: string]: string } = {
  false: 'FF0',
  true: 'FF1',
}

export const showIntroductionMap: { [key: string]: boolean } = {
  SI0: false,
  SI1: true,
}
export const showIntroductionKeyMap: { [key: string]: string } = {
  false: 'SI0',
  true: 'SI1',
}
