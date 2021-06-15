import createApiClient from '../../data/api'
import { FilteredMetaList, NavigateNextMail } from '../../utils'

const api = createApiClient()

const SetToDoMail = (props) => {
  const {
    messageId,
    history,
    labelURL,
    labelIds,
    metaList,
    viewIndex,
    storageLabels,
  } = props

  const filteredMetaList =
    metaList && labelIds && FilteredMetaList({ metaList, labelIds })

  const TODO_LABEL =
    storageLabels &&
    storageLabels.filter((label) => label.name === 'Juno/To Do')

  const TODO_ACTION = {
    removeLabelIds: [TODO_LABEL[0].id],
  }

  const MarkEmailToDo = async () => {
    await api.updateMessage(messageId, TODO_ACTION)
    NavigateNextMail(history, labelURL, filteredMetaList, viewIndex)
  }

  return MarkEmailToDo()
}

export default SetToDoMail
