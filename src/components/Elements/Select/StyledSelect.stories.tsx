import { StoryFn, Meta } from '@storybook/react'

import StyledSelect from './StyledSelect'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/StyledSelect',
  component: StyledSelect,
  args: {
    ariaLabelTrigger: 'Select',
    label: undefined,
    onValueChange: () => {},
    placeholder: undefined,
    selectOptions: [
      {
        id: '1',
        label: 'Possible numbers',

        options: [
          {
            value: '1',
            isDisabled: false,
          },
          {
            value: '2',
            isDisabled: false,
          },
          {
            value: '3',
            isDisabled: true,
          },
        ],
      },
    ],
    value: '1',
  },
} as Meta<typeof StyledSelect>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof StyledSelect> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <StyledSelect {...args} />
)

export const Regular = Template.bind({})
Regular.args = {}
