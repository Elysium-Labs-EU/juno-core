import messageApi from '../../data/messageApi'

const api = messageApi()

const ThrashMail = async ({ messageId }) => {
  await api.thrashMessage(messageId)
}

export default ThrashMail
