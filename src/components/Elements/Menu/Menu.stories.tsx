/* eslint-disable react/jsx-props-no-spreading */
import type { StoryFn, Meta } from '@storybook/react'

import MenuSectionComponent from './MenuSectionComponent'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Menu',
  component: MenuSectionComponent,
  args: {
    activeModalTag: 'MenuSectionComponent',
    menuItems: [
      {
        id: 'MenuSectionComponent-item-1',
        items: [
          {
            id: 'sub-MenuSectionComponent-item-1',
            title: 'Sub MenuSectionComponent Item 1',
            onClick: () => {},
            hint: ['Hint'],
          },
          {
            id: 'sub-MenuSectionComponent-item-2',
            title: 'Sub MenuSectionComponent Item 2',
            onClick: () => {},
            hint: ['CMD + K'],
          },
          {
            id: 'sub-MenuSectionComponent-item-3',
            title: 'Sub MenuSectionComponent Item 3',
            onClick: () => {},
          },
        ],
      },
      {
        id: 'MenuSectionComponent-item-2',
        items: [
          {
            id: 'sub-MenuSectionComponent-item-4',
            title: 'Sub MenuSectionComponent Item 4',
            onClick: () => {},
            hint: ['Hint'],
          },
          {
            id: 'sub-MenuSectionComponent-item-5',
            title: 'Sub MenuSectionComponent Item 5',
            onClick: () => {},
            hint: ['CMD + K'],
          },
          {
            id: 'sub-MenuSectionComponent-item-6',
            title: 'Sub MenuSectionComponent Item 6',
            onClick: () => {},
          },
        ],
      },
      {
        id: 'MenuSectionComponent-item-3',
        items: [
          {
            id: 'sub-MenuSectionComponent-item-7',
            title: 'Sub MenuSectionComponent Item 7',
            onClick: () => {},
            hint: ['Hint'],
          },
          {
            id: 'sub-MenuSectionComponent-item-8',
            title: 'Sub MenuSectionComponent Item 8',
            onClick: () => {},
            hint: ['CMD + K'],
          },
          {
            id: 'sub-MenuSectionComponent-item-9',
            title: 'Sub MenuSectionComponent Item 9',
            onClick: () => {},
          },
        ],
      },
    ],
    focusedItemIndex: 0,
    setFocusedItemIndex: () => {},
  },
} as Meta<typeof MenuSectionComponent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof MenuSectionComponent> = (args) => (
  <div style={{ backgroundColor: 'var(--color-black' }}>
    <MenuSectionComponent {...args} />
  </div>
)

export const Regular = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Regular.args = {}
