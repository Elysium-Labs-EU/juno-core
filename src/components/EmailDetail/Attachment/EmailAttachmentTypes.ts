export interface EmailAttachmentType {
  body: {
    size: number
    data: string
  }
  filename: string
  headers: any
  mimeType: string
  partId: string
}
