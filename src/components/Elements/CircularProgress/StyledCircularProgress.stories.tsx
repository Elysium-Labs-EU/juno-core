import type { StoryFn, Meta } from '@storybook/react'

import StyledCircularProgress from './StyledCircularProgress'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/CircularProgress',
  component: StyledCircularProgress,
} as Meta<typeof StyledCircularProgress>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof StyledCircularProgress> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <StyledCircularProgress {...args} />
)

export const Regular = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Regular.args = {}

export const CustomSize = Template.bind({})
CustomSize.args = {
  size: 40,
}
