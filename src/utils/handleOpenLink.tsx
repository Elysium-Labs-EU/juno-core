import toast from 'react-hot-toast'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import CustomToast from 'components/Elements/Toast/Toast'
import handleCopyToClipboard from 'utils/handleCopyToClipboard'

interface IHandleOpenLink {
  action: string | undefined
}

export default function handleOpenLink({ action }: IHandleOpenLink) {
  if (action) {
    const newWindow = window.open(action)

    setTimeout(() => {
      if (newWindow?.closed || !newWindow) {
        const messageContent =
          'Unable to open link at this time. Please try copying and pasting the link in your browser.'

        toast.custom((t) => (
          <CustomToast
            button={
              <CustomButton
                onClick={() => {
                  handleCopyToClipboard({ action })
                }}
                label="Copy"
              />
            }
            specificToast={t}
            title="We failed to copy"
            description={messageContent}
            variant="info"
          />
        ))
      }
    }, 1000)
  }
}
