import format from 'date-fns/format'
import { IEmailListObject } from '../store/storeTypes/emailListTypes'

export default function getEmailListTimeStamp(emailList: IEmailListObject[], activeEmailListIndex:number) {
    const timeStamp = ():string|undefined => {
        const value = emailList[activeEmailListIndex]?.timestamp
        if(value === undefined){ 
            return undefined
        }
        return format(value,"dd mm yyyy")
    }
    return timeStamp()
    }

    
