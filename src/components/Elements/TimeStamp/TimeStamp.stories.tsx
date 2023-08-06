import type { StoryFn, Meta } from '@storybook/react'

import TimeStampDisplay from './TimeStampDisplay'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/TimeStampDisplay',
  component: TimeStampDisplay,
} as Meta<typeof TimeStampDisplay>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof TimeStampDisplay> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TimeStampDisplay {...args} />
)

export const Regular = Template.bind({})
Regular.args = {
  threadTimeStamp: '1610000000000',
}

export const OnSameDay = Template.bind({})
const computeSameDay = () => {
  const date = new Date() // current date and time

  date.setHours(3)
  date.setMinutes(14)
  date.setSeconds(0)
  date.setMilliseconds(0)

  // get the Unix timestamp for the beginning of the current year
  const unixTimestamp = date.getTime()
  return unixTimestamp.toString()
}
OnSameDay.args = { threadTimeStamp: computeSameDay() }

export const ThisYear = Template.bind({})
const computeThisYear = () => {
  const date = new Date() // current date and time

  // set the month, day, and hours to the beginning of the year
  date.setMonth(0)
  date.setDate(1)
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)

  // get the Unix timestamp for the beginning of the current year
  const unixTimestamp = date.getTime()
  return unixTimestamp.toString()
}

ThisYear.args = {
  threadTimeStamp: computeThisYear(),
}
