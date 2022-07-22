import { useLocation } from 'react-router-dom'
import InboxEmptyState from './InboxEmptyState'
import ToDoEmptyState from './ToDoEmptyState'

const emptyStateMap: { [key: string]: JSX.Element } = {
  '/': <ToDoEmptyState />,
  '/inbox': <InboxEmptyState />,
  '/drafts': <p>No work left unsent</p>,
  '/sent': <p>No one has seen an email from you yet!</p>,
  default: <p>Nothing to see here</p>,
}

const EmailListEmptyStates = () => {
  const location = useLocation()
  return <div>{emptyStateMap[location.pathname]}</div>
}

export default EmailListEmptyStates
