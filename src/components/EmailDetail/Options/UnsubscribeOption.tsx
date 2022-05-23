import { FiSlash } from 'react-icons/fi'
import CustomButton from '../../Elements/Buttons/CustomButton'

const handleUnsubscribe = (link: string) => {
  window.open(link)
}

const UnsubscribeOption = ({
  unsubscribeLink,
}: {
  unsubscribeLink: string
}) => (
  <CustomButton
    icon={<FiSlash />}
    label="Unsubscribe"
    onClick={() => handleUnsubscribe(unsubscribeLink)}
    suppressed
  />
)

export default UnsubscribeOption
