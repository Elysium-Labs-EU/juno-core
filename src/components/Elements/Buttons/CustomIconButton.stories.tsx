import type { StoryFn, Meta } from '@storybook/react'

import { QiGift } from 'images/svgIcons/quillIcons'

import CustomIconButton from './CustomIconButton'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/IconButton',
  component: CustomIconButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: 'color' },
  //   },
} as Meta<typeof CustomIconButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof CustomIconButton> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <CustomIconButton {...args} />
)

export const Regular = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Regular.args = {
  icon: <QiGift />,
}

export const Disabled = Template.bind({})
Disabled.args = {
  icon: <QiGift />,
  disabled: true,
}

export const CustomHoverColor = Template.bind({})
CustomHoverColor.args = {
  icon: <QiGift />,
  hoverColor: 'var(--color-red-500)',
}
