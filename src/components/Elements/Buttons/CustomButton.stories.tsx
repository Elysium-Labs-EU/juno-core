import { StoryFn, Meta } from '@storybook/react'

import CustomButton from './CustomButton'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: CustomButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: 'color' },
  //   },
} as Meta<typeof CustomButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof CustomButton> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <CustomButton {...args} />
)

export const Regular = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Regular.args = {
  label: 'Button',
}

export const Supressed = Template.bind({})
Supressed.args = {
  label: 'Button',
  suppressed: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Button',
  disabled: true,
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  label: 'Button',
  icon: (
    <div style={{ width: '10px', height: '10px', backgroundColor: 'black' }} />
  ),
}

export const WithIconAfterLabel = Template.bind({})
WithIconAfterLabel.args = {
  label: 'Button',
  showIconAfterLabel: true,
  icon: (
    <div style={{ width: '10px', height: '10px', backgroundColor: 'black' }} />
  ),
}
