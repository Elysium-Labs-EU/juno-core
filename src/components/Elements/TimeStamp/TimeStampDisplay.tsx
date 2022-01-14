import React from 'react'
import { format, isSameDay, isThisYear } from 'date-fns'
import styled from 'styled-components'
import * as theme from '../../../constants/themeConstants'

const StyledTimeStamp = styled.span`
  color: ${ theme.colorLightGrey };
  white-space: nowrap;
`

interface IThreadTimeStamp {
  threadTimeStamp: string
}

const TimeStampDisplay = ({ threadTimeStamp }: IThreadTimeStamp) => {
  const unixTimestamp = parseInt(threadTimeStamp.toString(), 10)
  const currentTimestamp = Date.now()

  // If the timestamp is of today - send hours, 
  // If timestamp is not of today send date without year,
  // If timestamp if from another year, show full date.

  if (isThisYear(unixTimestamp)) {
    const isSameDayCheck = isSameDay(currentTimestamp, unixTimestamp) ?
      format(unixTimestamp, 'HH:mm') : format(unixTimestamp, 'dd LLL')
    return <StyledTimeStamp>{isSameDayCheck}</StyledTimeStamp>
  }

  return <StyledTimeStamp>{format(unixTimestamp, 'dd LLL yyyy')}</StyledTimeStamp>
}

export default TimeStampDisplay
