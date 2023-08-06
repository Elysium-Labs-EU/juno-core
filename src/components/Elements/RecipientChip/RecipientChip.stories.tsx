import type { StoryFn, Meta } from '@storybook/react'

import RecipientChip from './RecipientChip'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/RecipientChip',
  component: RecipientChip,
  args: {
    option: { name: 'Test User', emailAddress: 'test@test.com' },
    getTagProps: undefined,
    handleDelete: () => {},
    index: 0,
  },
} as Meta<typeof RecipientChip>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof RecipientChip> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RecipientChip {...args} />
)

export const Regular = Template.bind({})
Regular.args = {}
