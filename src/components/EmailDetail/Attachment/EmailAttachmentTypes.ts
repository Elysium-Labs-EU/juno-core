export interface EmailAttachmentType {
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
