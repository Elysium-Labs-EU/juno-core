import moment from 'moment'

const TimeStamp = ({ threadTimeStamp }) => {
  let unix_timestamp = threadTimeStamp.slice(0, 10)

  // console.log(threadTimeStamp.slice(0, 10))

  // var day = moment.unix({ threadTimeStamp })
  // var day = moment.unix(1318781876)
  // var day = moment.unix(1608835989);
  var day = moment.unix(threadTimeStamp.slice(0, 10))

  var dateString = moment.unix(unix_timestamp).format('DD MMM')

  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp * 1000)
  // Hours part from the timestamp
  var hours = date.getHours()
  // Minutes part from the timestamp
  var minutes = '0' + date.getMinutes()
  // // Seconds part from the timestamp
  // var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  var formattedTime = hours + ':' + minutes.substr(-2)

  // console.log(formattedTime);
  // console.log(day);
  // console.log(dateString);

  return <span>{dateString}</span>

  // const timestamp = Date.now(); // This would be the timestamp you want to format

  // console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp));
}

export default TimeStamp
