import type { TThreadObject } from 'store/storeTypes/emailListTypes'

export default function countUniqueFiles(activeThread: TThreadObject) {
  let filesCount = 0
  const uniqueFilesArray = [
    ...new Set(
      activeThread.messages.map((message) =>
        'files' in message.payload ? message.payload.files : []
      )
    ),
  ]

  for (let i = 0; i < uniqueFilesArray.length; i += 1) {
    const file = uniqueFilesArray[i]
    if (file !== undefined) {
      filesCount += file.length
    }
  }
  return filesCount
}
