import toast from 'react-hot-toast'

import CustomToast from 'components/Elements/Toast/Toast'
import copyToClipboard from 'utils/copyToClipboard/copyToClipboard'

export default async function handleCopyToClipboard({
  action,
}: {
  action: string | undefined
}) {
  if (action) {
    const result = await copyToClipboard(action)
    if (result) {
      toast.custom((t) => (
        <CustomToast
          variant="success"
          specificToast={t}
          title="Link successfully copied to clipboard."
        />
      ))
    } else {
      toast.custom((t) => (
        <CustomToast
          variant="error"
          specificToast={t}
          title="Link copy to clipboard failed."
        />
      ))
    }
  }
}
