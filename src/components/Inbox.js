import EmailList from './EmailList'

const LABEL = ['UNREAD', 'INBOX']

const Inbox = () => {
  return <EmailList labelIds={LABEL} />
}

export default Inbox
