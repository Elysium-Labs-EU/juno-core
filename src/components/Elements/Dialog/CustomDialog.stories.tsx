import { StoryFn, Meta } from '@storybook/react'

import CustomDialog from './CustomDialog'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/CustomDialog',
  component: CustomDialog,
  args: {
    DialogAriaLabel: 'Dialog-aria-label',
    DialogTitle: 'Dialog-title',
    open: false,
  },
} as Meta<typeof CustomDialog>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof CustomDialog> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <CustomDialog {...args}>
    <div>Dialog Content</div>
  </CustomDialog>
)

export const Regular = Template.bind({})
Regular.args = {}

export const IncludingSubTitle = Template.bind({})
IncludingSubTitle.args = {
  subTitle: <div>Sub Title</div>,
}
