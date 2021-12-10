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
