import { StoryFn, Meta } from '@storybook/react'

import CustomLabel from './CustomLabel'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/CustomLabel',
  component: CustomLabel,
  args: {
    labelName: 'Label Name',
  },
} as Meta<typeof CustomLabel>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof CustomLabel> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <CustomLabel {...args} />
)

export const Regular = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Regular.args = {}
