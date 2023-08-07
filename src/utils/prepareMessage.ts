import type { TBaseState } from 'store/storeTypes/baseTypes'
import type { ComposePayload } from 'store/storeTypes/composeTypes'
import type { TGmailV1SchemaDraftSchema } from 'store/storeTypes/gmailBaseTypes/gmailTypes'
import convertToGmailEmail from 'utils/convertToGmailEmail'

export function prepareFilesForSave({
  files,
  formData,
}: {
  files: Array<File>
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
 *
 * @async
 * @function prepareFormData
 * @param {Object} param0 - An object containing the following properties
 * @param {Object} param0.composedEmail - An object representing the composed email
 * @param {string} param0.emailAddress - Email address of the sender
 * @param {Object} param0.localDraftDetails - An object containing details of the local draft
 * @param {string} param0.name - Name of the sender
 * @returns {FormData} - Returns a FormData object containing the data to be sent to the server
 */

interface PrepareFormData {
  composedEmail: ComposePayload
  emailAddress: TBaseState['profile']['emailAddress']
  localDraftDetails: TGmailV1SchemaDraftSchema | undefined
  name: TBaseState['profile']['name']
}

export async function prepareFormData({
  composedEmail,
  emailAddress,
  localDraftDetails,
  name,
}: PrepareFormData) {
  const formData = new FormData()
  formData.append('draftId', localDraftDetails?.id ?? '')
  formData.append(
    'threadId',
    composedEmail.threadId
      ? composedEmail.threadId
      : localDraftDetails?.message?.threadId ?? ''
  )
  formData.append('messageId', localDraftDetails?.message?.id ?? '')
  if (emailAddress) {
    formData.append(
      'from',
      convertToGmailEmail([{ name: name ?? emailAddress, emailAddress }])
    )
  }
  formData.append(
    'to',
    composedEmail.to ? convertToGmailEmail(composedEmail.to) : ''
  )
  formData.append(
    'cc',
    composedEmail.cc ? convertToGmailEmail(composedEmail.cc) : ''
  )
  formData.append(
    'bcc',
    composedEmail.bcc ? convertToGmailEmail(composedEmail.bcc) : ''
  )
  formData.append('subject', composedEmail.subject ?? '')
  formData.append('body', composedEmail.body ?? '')
  formData.append('signature', composedEmail.signature ?? '')
  if (composedEmail.files && composedEmail.files.length > 0) {
    await prepareFilesForSave({ files: composedEmail.files, formData })
  } else {
    formData.append('files', '')
  }
  return formData
}
