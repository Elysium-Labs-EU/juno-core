import { createApiClient } from '../../data/api'
import { NavigateNextMail } from '../../utils'

const api = createApiClient()

const SetToDoMail = (props) => {
  // const SetToDoMail = (messageId, history, labelURL, emailList, viewIndex, storageLabels) => {
  const {
    messageId,
    history,
    labelURL,
    emailList,
    viewIndex,
    storageLabels,
  } = props

  console.log(props)

  console.log(storageLabels)
  const TODO_LABEL =
    storageLabels &&
    storageLabels.filter((label) => label.name === 'Juno/To Do')
  console.log(TODO_LABEL)
  const TODO_ACTION = {
    removeLabelIds: ['INBOX', 'UNREAD'],
    addLabelIds: [TODO_LABEL[0].id],
  }

  const MarkEmailToDo = async () => {
    await api.updateMessage(messageId, TODO_ACTION)
    NavigateNextMail(history, labelURL, emailList, viewIndex)
  }

  return MarkEmailToDo()
}

export default SetToDoMail
