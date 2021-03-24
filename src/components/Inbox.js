import EmailList from './EmailList'

const LABEL = ['UNREAD', 'INBOX']

const Inbox = () => {
  return (
    <>
      <EmailList Labels={LABEL}/>
    </>
  )
}

export default Inbox
