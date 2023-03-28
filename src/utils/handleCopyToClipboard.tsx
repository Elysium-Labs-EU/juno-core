import toast from 'react-hot-toast'

import copyToClipboard from 'utils/copyToClipboard/copyToClipboard'

export default async function handleCopyToClipboard({
  action,
}: {
  action: string | undefined
}) {
  if (action) {
    const result = await copyToClipboard(action)
    if (result) {
      toast.success('Link successfully copied to clipboard.')
    } else {
      toast.error('Link copy to clipboard failed.')
    }
  }
}
