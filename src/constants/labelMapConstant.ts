import * as global from 'constants/globalConstants'
import RoutesConstants from 'constants/routesConstants'

export const getRouteByLabelMap: { [key: string]: string } = {
  [global.INBOX_LABEL]: `${RoutesConstants.INBOX}`,
  [global.TODO_LABEL_NAME]: `${RoutesConstants.TODO}`,
  [global.SPAM_LABEL]: `${RoutesConstants.SPAM}`,
  [global.DRAFT_LABEL]: `${RoutesConstants.DRAFTS}`,
  [global.SENT_LABEL]: `${RoutesConstants.SENT}`,
  [global.ARCHIVE_LABEL]: `${RoutesConstants.ARCHIVE}`,
}

export const getLabelByRoute: { [key: string]: string } = {
  [RoutesConstants.INBOX]: global.INBOX_LABEL,
  [RoutesConstants.TODO]: global.TODO_LABEL_NAME,
  [RoutesConstants.SPAM]: global.SPAM_LABEL,
  [RoutesConstants.DRAFTS]: global.DRAFT_LABEL,
  [RoutesConstants.SENT]: global.SENT_LABEL,
  [RoutesConstants.ARCHIVE]: global.ARCHIVE_LABEL,
}

export const getHeaderByRoute: { [key: string]: string } = {
  [RoutesConstants.INBOX]: global.HEADER_INBOX,
  [RoutesConstants.TODO]: global.HEADER_TODO,
  [RoutesConstants.DRAFTS]: global.HEADER_DRAFTS,
  [RoutesConstants.SENT]: global.HEADER_SENT,
  [RoutesConstants.ARCHIVE]: global.HEADER_ARCHIVE,
}

