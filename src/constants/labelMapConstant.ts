import RoutesConstants from './routes.json'

const labelMap: { [key: string]: string } = {
  INBOX: `${RoutesConstants.INBOX}`,
  'Juno/To Do': `${RoutesConstants.HOME}`,
  SPAM: `${RoutesConstants.SPAM}`,
  DRAFT: `${RoutesConstants.DRAFTS}`,
  SENT: `${RoutesConstants.SENT}`,
  'All Mail': `${RoutesConstants.ALL_EMAIL}`,
}

export default labelMap
