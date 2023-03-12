import axios from 'axios'

import { errorBlockTemplate } from 'data/api'
import type { TemplateApiResponse } from 'data/api'

export interface ISendFeedback {
  type: 'BUG' | 'FEEDBACK' | 'IDEA'
  message: string
  metadata?: JSON
  email?: string
}

const feedbackApi = () => ({
  sendFeedback: async (body: ISendFeedback): TemplateApiResponse<any> => {
    try {
      const res = await axios.post<any>(
        `${import.meta.env.VITE_HEADLESS_FEEDBACK_URL}`,
        body
      )
      return res
    } catch (err) {
      return errorBlockTemplate(err)
    }
  },
})

export default feedbackApi
