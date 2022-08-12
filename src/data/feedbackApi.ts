import { AxiosResponse } from 'axios'
import assertNonNullish from '../utils/assertNonNullish'
import { errorHandling, instance } from './api'

interface ISendFeedback {
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
    sendFeedback: async ({ body }: { body: ISendFeedback }) => {
      try {
        const res: AxiosResponse<any> = await instance.post(
          `${import.meta.env.VITE_HEADLESS_FEEDBACK_URL}`,
          {
            params: {
              body,
            },
          }
        )
        return res
      } catch (err) {
        return errorHandling(err)
      }
    },
  }
}

export default feedbackApi

// opacity: 1;
// transform: none;
// top: 496px;
// transform-origin: 100% 100%;
// left: 839px;
