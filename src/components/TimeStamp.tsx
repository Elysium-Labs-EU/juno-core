import React from 'react'
import { format, isSameDay } from 'date-fns'

type TimeStampType = {
  threadTimeStamp: string
}

const TimeStamp = ({ threadTimeStamp }: TimeStampType) => {
  const unixTimestamp = parseInt(threadTimeStamp.toString(), 10)
  const currentTimestamp = Date.now()

  // If the timestamp is of today - send hours, if timestamp is not of today send date
  const isSameDayCheck = isSameDay(currentTimestamp, unixTimestamp) ?
    format(unixTimestamp, 'HH:m') : format(unixTimestamp, 'dd LLL')

  return <span className="date">{isSameDayCheck}</span>
}

export default TimeStamp
