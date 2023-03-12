import * as global from 'constants/globalConstants'
import RoutesConstants from 'constants/routesConstants'

export const getRouteByLabelMap: { [key: string]: string } = {
  [global.INBOX_LABEL]: `${RoutesConstants.INBOX}`,
  [global.TODO_LABEL_NAME]: `${RoutesConstants.TODO}`,
  [global.SPAM_LABEL]: `${RoutesConstants.SPAM}`,
  [global.DRAFT_LABEL]: `${RoutesConstants.DRAFT}`,
  [global.SENT_LABEL]: `${RoutesConstants.SENT}`,
  [global.ARCHIVE_LABEL]: `${RoutesConstants.ARCHIVE}`,
  [global.TRASH_LABEL]: `${RoutesConstants.TRASH}`,
}

export const getLabelByRoute: { [key: string]: string } = {
  [RoutesConstants.INBOX]: global.INBOX_LABEL,
  [RoutesConstants.TODO]: global.TODO_LABEL_NAME,
  [RoutesConstants.SPAM]: global.SPAM_LABEL,
  [RoutesConstants.DRAFT]: global.DRAFT_LABEL,
  [RoutesConstants.SENT]: global.SENT_LABEL,
  [RoutesConstants.ARCHIVE]: global.ARCHIVE_LABEL,
  [RoutesConstants.TRASH]: global.TRASH_LABEL,
}

export const getHeaderByRoute: { [key: string]: string } = {
  [RoutesConstants.INBOX]: global.HEADER_INBOX,
  [RoutesConstants.TODO]: global.HEADER_TODO,
  [RoutesConstants.DRAFT]: global.HEADER_DRAFT,
  [RoutesConstants.SENT]: global.HEADER_SENT,
  [RoutesConstants.ARCHIVE]: global.HEADER_ARCHIVE,
  [RoutesConstants.TRASH]: global.HEADER_TRASH,
}
