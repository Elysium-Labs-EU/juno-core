import { createApiClient } from '../../data/api'
import { NavigateNextMail } from '../../utils'

const api = createApiClient()

const SetToDoMail = props => {
// const SetToDoMail = (messageId, history, labelURL, emailList, viewIndex, storageLabels) => {
    const {messageId, history, labelURL, emailList, viewIndex, storageLabels } = props

    console.log(props)

    console.log(storageLabels)
    const TODO_LABEL = storageLabels && storageLabels.filter(label => label.name === 'Juno/To Do')
    console.log(TODO_LABEL)

  const MarkEmailToDo = async () => {
    await api.updateMessage(messageId, TODO_LABEL[0].id)
    NavigateNextMail(history, labelURL, emailList, viewIndex)
  }

  return MarkEmailToDo()
}

export default SetToDoMail
