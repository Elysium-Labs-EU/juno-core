import { StoryFn, Meta } from '@storybook/react'

import CustomModal from './CustomModal'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/CustomModal',
  component: CustomModal,
  args: {
    modalAriaLabel: 'modal-aria-label',
    modalTitle: 'modal-title',
    open: false,
  },
} as Meta<typeof CustomModal>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof CustomModal> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <CustomModal {...args}>
    <div>Modal Content</div>
  </CustomModal>
)

export const Regular = Template.bind({})
Regular.args = {}

export const IncludingSubTitle = Template.bind({})
IncludingSubTitle.args = {
  subTitle: <div>Sub Title</div>,
}
