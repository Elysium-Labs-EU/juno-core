import { IComposePayload } from 'store/storeTypes/composeTypes'
import { IDraftDetailObject } from 'store/storeTypes/draftsTypes'
import convertToGmailEmail from 'utils/convertToGmailEmail'

export async function prepareFilesForSave({
  files,
  formData,
}: {
  files: File[]
  formData: FormData
}) {
  try {
    files.forEach((file) => formData.append('file', file, file.name))
    return formData
  } catch (err) {
    return []
  }
}

/**
 * @function prepareFormData
 * @param param0
 * @returns it will return a FormData object based on the input
 */

export async function prepareFormData({
  composedEmail,
  emailAddress,
  localDraftDetails,
  name,
}: {
  composedEmail: IComposePayload
  emailAddress: string
  localDraftDetails: IDraftDetailObject | undefined
  name: string
}) {
  const formData = new FormData()
  formData.append('draftId', localDraftDetails?.id ?? '')
  formData.append(
    'threadId',
    composedEmail?.threadId
      ? composedEmail.threadId
      : localDraftDetails?.message?.threadId ?? ''
  )
  formData.append('messageId', localDraftDetails?.message?.id ?? '')
  formData.append('from', convertToGmailEmail([{ name, emailAddress }]))
  formData.append(
    'to',
    composedEmail?.to ? convertToGmailEmail(composedEmail.to) : ''
  )
  formData.append(
    'cc',
    composedEmail?.cc ? convertToGmailEmail(composedEmail.cc) : ''
  )
  formData.append(
    'bcc',
    composedEmail?.bcc ? convertToGmailEmail(composedEmail.bcc) : ''
  )
  formData.append('subject', composedEmail?.subject ?? '')
  formData.append('body', composedEmail?.body ?? '')
  formData.append('signature', composedEmail?.signature ?? '')
  if (composedEmail?.files && composedEmail.files.length > 0) {
    await prepareFilesForSave({ files: composedEmail?.files, formData })
  } else {
    formData.append('files', '')
  }
  return formData
}
