import type { StoryFn, Meta } from '@storybook/react'

import AttachmentBubble from './AttachmentBubble'

const attachmentData = {
  body: {
    attachmentId: 'ATTACHMENT_ID',
    size: 123456,
  },
  mimeType: 'image/png',
  headers: {},
  partId: 'PART_ID',
  filename: 'ATTACHMENT_NAME',
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/AttachmentBubble',
  component: AttachmentBubble,
} as Meta<typeof AttachmentBubble>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AttachmentBubble> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <AttachmentBubble {...args} />
)

export const Regular = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Regular.args = {
  attachmentData,
}
