import type { StoryFn, Meta } from '@storybook/react'

import InboxRefreshOption from './InboxRefreshOption'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/InboxRefreshOption',
  component: InboxRefreshOption,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: 'color' },
  //   },
} as Meta<typeof InboxRefreshOption>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof InboxRefreshOption> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <InboxRefreshOption {...args} />
)

export const Regular = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Regular.args = {}

export const WithLabel = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLabel.args = {
  showButtonLabel: true,
}
