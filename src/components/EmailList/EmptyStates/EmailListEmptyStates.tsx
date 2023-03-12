import { useLocation } from 'react-router-dom'

import * as local from 'constants/emptyStateConstants'
import RoutesConstants from 'constants/routesConstants'

import EmptyStateTemplate from './EmptyStateTemplate'

const emptyStateMap: { [key: string]: JSX.Element } = {
  [RoutesConstants.TODO]: (
    <EmptyStateTemplate
      header={local.TODO_HEADER}
      paragraph={local.TODO_PARAGRAPH}
      SVG={local.TODO_SVG}
    />
  ),
  [RoutesConstants.INBOX]: (
    <EmptyStateTemplate
      header={local.INBOX_HEADER}
      paragraph={local.INBOX_PARAGRAPH}
      SVG={local.INBOX_SVG}
    />
  ),
  [RoutesConstants.DRAFT]: (
    <EmptyStateTemplate
      header={local.DRAFT_HEADER}
      paragraph={local.DRAFT_PARAGRAPH}
      SVG={local.DRAFT_SVG}
    />
  ),
  [RoutesConstants.SENT]: (
    <EmptyStateTemplate
      header={local.SENT_HEADER}
      paragraph={local.SENT_PARAGRAPH}
      SVG={local.SENT_SVG}
    />
  ),
  [RoutesConstants.ARCHIVE]: (
    <EmptyStateTemplate
      header={local.SENT_HEADER}
      paragraph={local.SENT_PARAGRAPH}
      SVG={local.SENT_SVG}
    />
  ),
  [RoutesConstants.TRASH]: (
    <EmptyStateTemplate
      header={local.SENT_HEADER}
      paragraph={local.SENT_PARAGRAPH}
      SVG={local.SENT_SVG}
    />
  ),
  [RoutesConstants.SPAM]: (
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
