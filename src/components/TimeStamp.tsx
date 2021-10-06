import React from 'react'
import moment from 'moment'

type TimeStampType = {
  threadTimeStamp: string
}

const TimeStamp = ({ threadTimeStamp }: TimeStampType) => {
  const unixTimestamp = parseInt(threadTimeStamp.toString().slice(0, 10), 10)

  // console.log(threadTimeStamp.slice(0, 10))

  // var day = moment.unix({threadTimeStamp})
  // var day = moment.unix(1318781876)
  // var day = moment.unix(1608835989);
  // const day = moment.unix(threadTimeStamp.slice(0, 10))

  const dateString = moment.unix(unixTimestamp).format('DD MMM')

  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  // const date = new Date(unixTimestamp * 1000)
  // Hours part from the timestamp
  // const hours = date.getHours()
  // Minutes part from the timestamp
  // const minutes = `0${ date.getMinutes() }`
  // // Seconds part from the timestamp
  // var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  // const formattedTime = `${ hours }:${ minutes.substr(-2) }`

  // console.log(formattedTime);
  // console.log(day);
  // console.log(dateString);

  return <span className="date">{dateString}</span>

  // const timestamp = Date.now(); // This would be the timestamp you want to format

  // console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp));
}

export default TimeStamp
