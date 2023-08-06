import type { StoryFn, Meta } from '@storybook/react'

import EmptyState from './EmptyState'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/EmptyState',
  component: EmptyState,
} as Meta<typeof EmptyState>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof EmptyState> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <EmptyState {...args} />
)

export const Regular = Template.bind({})
Regular.args = {}
