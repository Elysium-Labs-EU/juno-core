import type {
  IEmailMessageHeaders,
  IEmailMessagePayloadRaw,
  IEmailMessagePayloadConverted,
  IEmailMessage,
  IEmailListThreadItem,
} from 'store/storeTypes/emailListTypes'

const emailMessageHeaders: IEmailMessageHeaders = {
  date: '01/01/2022',
  from: 'test@example.com',
  subject: 'Test Subject',
  to: 'recipient@example.com',
  cc: 'cc@example.com',
  bcc: 'bcc@example.com',
}

const emailMessagePayloadRaw: IEmailMessagePayloadRaw = {
  partId: '1',
  mimeType: 'text/plain',
  filename: 'test.txt',
  headers: emailMessageHeaders,
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
      headers: emailMessageHeaders,
      body: {
        data: '',
        attachmentId: 'attachment2',
        size: 2048,
      },
    },
  ],
}

const emailMessagePayloadConverted: IEmailMessagePayloadConverted = {
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

const emailMessage: IEmailMessage = {
  id: '1',
  threadId: '1',
  labelIds: ['inbox', 'important'],
  snippet: 'Test snippet',
  payload: emailMessagePayloadConverted,
  sizeEstimate: 8192,
  historyId: '1',
  internalDate: '01/01/2022',
}

const emailListThreadItem: IEmailListThreadItem = {
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
