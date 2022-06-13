export interface IAttachment {
  mimeType: string
  decodedB64: string
  filename: string
  contentID: string
}

export interface IEmailAttachmentType {
  body: {
    size: number
    data: string
    attachmentId: string
  }
  filename: string
  headers: any
  mimeType: string
  partId: string
}
