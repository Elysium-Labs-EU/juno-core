/* eslint-disable import/prefer-default-export */
import type { IEmailListFilteredByLabel } from 'utils/getEmailListIndex/getEmailListIndex'

export const testObject: IEmailListFilteredByLabel = {
  emailList: [
    {
      labels: ['inbox', 'important'],
      threads: [
        {
          id: '1',
          historyId: '1',
          messages: [
            {
              id: '1',
              threadId: '1',
              labelIds: ['inbox', 'important'],
              snippet: 'Test email snippet',
              payload: {
                mimeType: 'text/html',
                headers: {
                  date: 'Jan 1, 2021',
                  from: 'test@example.com',
                  subject: 'Test Email',
                  to: 'recipient@example.com',
                  cc: '',
                  bcc: '',
                },
                files: [
                  {
                    partId: '1',
                    mimeType: 'application/pdf',
                    filename: 'test.pdf',
                    headers: {
                      date: 'Jan 1, 2021',
                      from: 'test@example.com',
                      subject: 'Test Email',
                      to: 'recipient@example.com',
                      cc: '',
                      bcc: '',
                    },
                    body: {
                      data: '',
                      attachmentId: '123',
                      size: 100,
                    },
                  },
                ],
                body: {
                  emailFileHTML: [],
                  emailHTML: '<p>Test email body</p>',
                  removedTrackers: [],
                },
              },
              sizeEstimate: 1000,
              historyId: '1',
              internalDate: 'Jan 1, 2021',
            },
          ],
        },
      ],
      nextPageToken: null,
      resultSizeEstimate: 1,
      timestamp: 1609372800,
      q: 'is:inbox',
    },
  ],
  labelIds: ['inbox'],
}
