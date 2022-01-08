import React from 'react'
import { format, isSameDay, isThisYear } from 'date-fns'
// import { isThisYear } from 'date-fns/esm'

type TimeStampType = {
  threadTimeStamp: string
}

const TimeStampDisplay = ({ threadTimeStamp }: TimeStampType) => {
  const unixTimestamp = parseInt(threadTimeStamp.toString(), 10)
  const currentTimestamp = Date.now()
  const currentYear = Date.now()

  // If the timestamp is of today - send hours, if timestamp is not of today send date
  if(isThisYear(unixTimestamp)){
    const isSameDayCheck = isSameDay(currentTimestamp, unixTimestamp) ?
      format(unixTimestamp, 'HH:mm') : format(unixTimestamp, 'dd LLL')
      return <span className="date">{isSameDayCheck}</span>
  } 
  
  return <span className="date">{format(unixTimestamp, 'dd LLL yyyy')}</span>
}

export default TimeStampDisplay
