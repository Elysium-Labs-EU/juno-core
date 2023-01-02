import { StoryFn, Meta } from '@storybook/react'

import CustomLink from './CustomLink'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/CustomLink',
  component: CustomLink,
  args: {
    to: '#',
    label: 'Custom Link',
  },
} as Meta<typeof CustomLink>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof CustomLink> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <CustomLink {...args} />
)

export const Regular = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Regular.args = {}
