import toast from 'react-hot-toast'

import CustomButton from 'components/Elements/Buttons/CustomButton'
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

        toast.error((t) => (
          <span>
            {messageContent}
            <CustomButton
              onClick={() => {
                handleCopyToClipboard({ action })
                toast.dismiss(t.id)
              }}
              label="Copy"
            />
          </span>
        ))
      }
    }, 1000)
  }
}
