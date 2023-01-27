/* eslint-disable react/jsx-props-no-spreading */
import { StoryFn, Meta } from '@storybook/react'

import EmailListItem from './EmailListItem'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/EmailListItem',
  component: EmailListItem,
  args: {
    activeIndex: -1,
    email: {
      id: '1',
      historyId: '1',
      messages: [
        {
          id: '1',
          threadId: '1',
          labelIds: ['INBOX'],
          snippet: 'Hello World',
          sizeEstimate: 1,
          historyId: '1',
          internalDate: '2021-01-01T00:00:00.000Z',
          payload: {
            headers: {
              date: '2021-01-01T00:00:00.000Z',
              from: 'John Doe',
              subject: 'Hello World',
              to: 'Jane Doe',
              cc: 'John Doe',
              bcc: 'Jane Doe',
            },
            body: {
              emailHTML: '<p>Hello World</p>',
            },
            mimeType: 'text/plain',
          },
        },
      ],
    },
    index: 0,
  },
} as Meta<typeof EmailListItem>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof EmailListItem> = (args) => (
  <EmailListItem {...args} />
)

export const Regular = Template.bind({})
Regular.args = {}

export const CheckboxActive = Template.bind({})
CheckboxActive.args = {
  showCheckbox: true,
}

export const ShowLabel = Template.bind({})
ShowLabel.args = {
  showLabel: true,
}

export const KeyboardActive = Template.bind({})
KeyboardActive.args = {
  activeIndex: 0,
}

export const WithAttachment = Template.bind({})
WithAttachment.args = {
  email: {
    id: '1',
    historyId: '1',
    messages: [
      {
        id: '1',
        threadId: '1',
        labelIds: ['INBOX'],
        snippet: 'Hello World',
        sizeEstimate: 1,
        historyId: '1',
        internalDate: '2021-01-01T00:00:00.000Z',
        payload: {
          headers: {
            deliveredTo: 'Jane Doe',
            date: '2021-01-01T00:00:00.000Z',
            from: 'John Doe',
            subject: 'Hello World',
            to: 'Jane Doe',
            cc: 'John Doe',
            bcc: 'Jane Doe',
          },
          files: [
            {
              partId: '1',
              filename: 'test.txt',
              mimeType: 'text/plain',
              headers: {
                date: '2021-01-01T00:00:00.000Z',
                from: 'John Doe',
                subject: 'Hello World',
                to: 'Jane Doe',
                cc: 'John Doe',
                bcc: 'Jane Doe',
              },
              body: {
                attachmentId: '1',
                size: 1,
                data: 'SGVsbG8gV29ybGQ=',
              },
            },
          ],
          body: {
            emailHTML: '<p>Hello World</p>',
            emailFileHTML: ['FILE'],
            removedTrackers: [],
          },
          mimeType: 'text/plain',
        },
      },
    ],
  },
}
