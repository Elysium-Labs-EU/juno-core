import axios from 'axios'
import type { AxiosResponse } from 'axios'

import { errorHandling } from 'data/api'
import assertNonNullish from 'utils/assertNonNullish'

export interface ISendFeedback {
  type: 'BUG' | 'FEEDBACK' | 'IDEA'
  message: string
  metadata?: JSON
  email?: string
}

const feedbackApi = () => {
  // Only require this check whenever in production mode.
  process.env.NODE_ENV === 'production' &&
    assertNonNullish(
      import.meta.env.VITE_HEADLESS_FEEDBACK_URL,
      'Unable to find headless feedback URL'
    )

  return {
    sendFeedback: async (body: ISendFeedback) => {
      try {
        const res: AxiosResponse<any> = await axios.post(
          `${import.meta.env.VITE_HEADLESS_FEEDBACK_URL}`,
          body
        )
        return res
      } catch (err) {
        return errorHandling(err)
      }
    },
  }
}

export default feedbackApi
