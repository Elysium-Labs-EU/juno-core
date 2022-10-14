import format from 'date-fns/format'

export default function getEmailListTimeStamp(emailList: any, activeEmailListIndex:number) {
    const timeStamp = emailList[activeEmailListIndex]?.timestamp
    let unixTimeStamp
    if (timeStamp !== undefined){
    unixTimeStamp = format(timeStamp,"dd mm yyyy")
    } 
  return unixTimeStamp
  }
