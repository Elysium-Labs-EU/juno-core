import { EmailListThreadItem } from "../../../Store/emailListTypes"

const GetTimeStamp = (email: EmailListThreadItem): string => {
    if (email && email.messages) return email.messages[email.messages.length - 1].internalDate
    if (email && email.message) return email.message.internalDate
    return ''
}

export default GetTimeStamp