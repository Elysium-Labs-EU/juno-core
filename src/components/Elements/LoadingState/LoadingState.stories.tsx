import type { StoryFn, Meta } from '@storybook/react'

import LoadingState from './LoadingState'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/LoadingState',
  component: LoadingState,
} as Meta<typeof LoadingState>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof LoadingState> = () => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <LoadingState />
)

export const Regular = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Regular.args = {}
