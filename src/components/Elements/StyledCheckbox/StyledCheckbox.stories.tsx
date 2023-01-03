import { StoryFn, Meta } from '@storybook/react'

import StyledCheckbox from './StyledCheckbox'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/StyledCheckbox',
  component: StyledCheckbox,
  args: {
    onChange: () => {},
  },
} as Meta<typeof StyledCheckbox>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof StyledCheckbox> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <StyledCheckbox {...args} />
)

export const Unchecked = Template.bind({})
Unchecked.args = {
  isChecked: false,
}

export const Checked = Template.bind({})
Checked.args = {
  isChecked: true,
}
