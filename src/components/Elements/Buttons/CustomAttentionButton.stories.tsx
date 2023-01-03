import { StoryFn, Meta } from '@storybook/react'

import { QiGift } from 'images/svgIcons/quillIcons'

import CustomAttentionButton from './CustomAttentionButton'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/AttentionButton',
  component: CustomAttentionButton,
} as Meta<typeof CustomAttentionButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof CustomAttentionButton> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <CustomAttentionButton {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  label: 'Button',
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Button',
  variant: 'secondary',
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Button',
  disabled: true,
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  label: 'Button',
  icon: <QiGift color="white" />,
}
