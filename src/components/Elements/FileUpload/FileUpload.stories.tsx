import { StoryFn, Meta } from '@storybook/react'

import { QiGift } from 'images/svgIcons/quillIcons'

import FileUpload from './FileUpload'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/FileUpload',
  component: FileUpload,
  args: {
    onDropHandeler: () => {},
  },
} as Meta<typeof FileUpload>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof FileUpload> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <FileUpload {...args} />
)

export const Regular = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Regular.args = {}

export const CustomIcon = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
CustomIcon.args = {
  icon: <QiGift size={16} />,
}

export const CustomTexts = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
CustomTexts.args = {
  dropTextActive: 'Beep Drop active',
  dropTextInactive: 'Boop Drop inactive',
}
