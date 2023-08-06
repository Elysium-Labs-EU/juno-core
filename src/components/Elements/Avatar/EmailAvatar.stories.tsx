import type { StoryFn, Meta } from '@storybook/react'

import { EmailAvatarComponent } from './EmailAvatar'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Avatar',
  component: EmailAvatarComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: 'color' },
  //   },
} as Meta<typeof EmailAvatarComponent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof EmailAvatarComponent> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <EmailAvatarComponent {...args} />
)

export const Regular = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Regular.args = {
  userEmail: 'test@gmail.com',
}
