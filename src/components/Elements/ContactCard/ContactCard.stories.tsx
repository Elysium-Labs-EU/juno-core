import type { StoryFn, Meta } from '@storybook/react'

import { ContactCardContent } from './ContactCard'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/ContactCardContent',
  component: ContactCardContent,
  args: {
    contact: { emailAddress: 'test@test.com', name: 'Test User' },
    staticInitials: 'TU',
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as Meta<typeof ContactCardContent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof ContactCardContent> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ContactCardContent {...args} />
)

export const Regular = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Regular.args = {}
