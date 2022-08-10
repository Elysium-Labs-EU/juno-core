import { useLocation } from 'react-router-dom'
import EmptyStateTemplate from './EmptyStateTemplate'
import * as local from '../../../constants/emptyStateConstants'

const emptyStateMap: { [key: string]: JSX.Element } = {
  '/': (
    <EmptyStateTemplate
      header={local.TODO_HEADER}
      paragraph={local.TODO_PARAGRAPH}
      SVG={local.TODO_SVG}
    />
  ),
  '/inbox': (
    <EmptyStateTemplate
      header={local.INBOX_HEADER}
      paragraph={local.INBOX_PARAGRAPH}
      SVG={local.INBOX_SVG}
    />
  ),
  '/drafts': (
    <EmptyStateTemplate
      header={local.DRAFT_HEADER}
      paragraph={local.DRAFT_PARAGRAPH}
      SVG={local.DRAFT_SVG}
    />
  ),
  '/sent': (
    <EmptyStateTemplate
      header={local.SENT_HEADER}
      paragraph={local.SENT_PARAGRAPH}
      SVG={local.SENT_SVG}
    />
  ),
  default: <p>Nothing to see here</p>,
}

const EmailListEmptyStates = () => {
  const location = useLocation()
  return <div>{emptyStateMap[location.pathname]}</div>
}

export default EmailListEmptyStates
