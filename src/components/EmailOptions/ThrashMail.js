import { createApiClient } from '../../data/api'

const api = createApiClient()

const ThrashMail = async ({ messageId }) => {
    await api.thrashMessage(messageId)
}

export default ThrashMail
