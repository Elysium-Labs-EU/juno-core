import { format, isSameDay, isThisYear } from 'date-fns'
import styled from 'styled-components'
import StyledTooltip from '../StyledTooltip'

const StyledTimeStamp = styled.span`
  color: var(--color-neutral-400);
  white-space: nowrap;
`

interface IThreadTimeStamp {
  threadTimeStamp: string
}

const TimeStampDisplay = ({ threadTimeStamp }: IThreadTimeStamp) => {
  if (threadTimeStamp) {
    const unixTimestamp = parseInt(threadTimeStamp.toString(), 10)
    const currentTimestamp = Date.now()

    // If the timestamp is of today - send hours,
    // If timestamp is not of today send date without year,
    // If timestamp if from another year, show full date.
    if (isThisYear(unixTimestamp)) {
      const isSameDayCheck = isSameDay(currentTimestamp, unixTimestamp)
        ? format(unixTimestamp, 'HH:mm')
        : format(unixTimestamp, 'dd LLL')
      return (
        <StyledTooltip title={format(unixTimestamp, 'PPpp')}>
          <StyledTimeStamp data-testid="email-timestamp">
            {isSameDayCheck}
          </StyledTimeStamp>
        </StyledTooltip>
      )
    }

    return (
      <StyledTooltip title={format(unixTimestamp, 'PPpp')}>
        <StyledTimeStamp data-testid="email-timestamp">
          {format(unixTimestamp, 'dd LLL yyyy')}
        </StyledTimeStamp>
      </StyledTooltip>
    )
  }
  return <div data-testid="email-no-timestamp" />
}

export default TimeStampDisplay
