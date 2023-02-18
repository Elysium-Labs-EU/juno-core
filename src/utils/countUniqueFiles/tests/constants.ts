import type {
  TThreadObject,
  TPayloadHeadersEnhanced,
  TFullMessage,
  TGmailV1SchemaMessagePartSchema,
} from 'store/storeTypes/emailListTypes'

const emailMessageHeaders: TPayloadHeadersEnhanced = {
  listUnsubscribe: '',
  deliveredTo: 'recipient@example.com',
  date: '01/01/2022',
  from: 'test@example.com',
  subject: 'Test Subject',
  to: 'recipient@example.com',
  cc: 'cc@example.com',
  bcc: 'bcc@example.com',
}

const emailMessageHeadersRaw = {
  name: '',
  value: '',
}

const emailMessagePayloadRaw: TGmailV1SchemaMessagePartSchema = {
  partId: '1',
  mimeType: 'text/plain',
  filename: 'test.txt',
  headers: [emailMessageHeadersRaw],
  body: {
    data: 'Test body data',
    attachmentId: 'attachment1',
    size: 1024,
  },
  parts: [
    {
      partId: '2',
      mimeType: 'image/jpeg',
      filename: 'image.jpg',
      headers: [emailMessageHeadersRaw],
      body: {
        data: '',
        attachmentId: 'attachment2',
        size: 2048,
      },
    },
  ],
}

const emailMessagePayloadConverted: TFullMessage['payload'] = {
  mimeType: 'text/html',
  headers: emailMessageHeaders,
  files: [
    {
      partId: '3',
      mimeType: 'application/pdf',
      filename: 'document.pdf',
      headers: emailMessageHeaders,
      body: {
        data: '',
        attachmentId: 'attachment3',
        size: 4096,
      },
    },
    {
      partId: '4',
      mimeType: 'application/pdf',
      filename: 'document1.pdf',
      headers: emailMessageHeaders,
      body: {
        data: '',
        attachmentId: 'attachment4',
        size: 4096,
      },
    },
    {
      partId: '5',
      mimeType: 'application/pdf',
      filename: 'document2.pdf',
      headers: emailMessageHeaders,
      body: {
        data: '',
        attachmentId: 'attachment5',
        size: 4096,
      },
    },
  ],
  body: {
    emailFileHTML: [],
    emailHTML: '<p>Test HTML body</p>',
    removedTrackers: ['tracker1', 'tracker2'],
  },
  parts: [emailMessagePayloadRaw],
}

const emailMessage: TFullMessage = {
  id: '1',
  threadId: '1',
  labelIds: ['inbox', 'important'],
  snippet: 'Test snippet',
  payload: emailMessagePayloadConverted,
  sizeEstimate: 8192,
  historyId: '1',
  internalDate: '01/01/2022',
}

const emailListThreadItem: TThreadObject = {
  id: '1',
  historyId: '1',
  messages: [emailMessage],
}

export {
  emailMessageHeaders,
  emailMessagePayloadRaw,
  emailMessagePayloadConverted,
  emailMessage,
  emailListThreadItem,
}
