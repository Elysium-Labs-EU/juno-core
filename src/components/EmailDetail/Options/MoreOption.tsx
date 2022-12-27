import CustomButton from 'components/Elements/Buttons/CustomButton'
import * as local from 'constants/emailDetailConstants'
import { QiMeatballsH } from 'images/svgIcons/quillIcons'

interface IMoreOption {
  setShowMenu: (value: boolean) => void
  showMenu: boolean
  iconSize: number
}

const MoreOption = ({ setShowMenu, showMenu, iconSize }: IMoreOption) => (
  <CustomButton
    icon={<QiMeatballsH size={iconSize} />}
    onClick={() => setShowMenu(!showMenu)}
    label={local.BUTTON_MORE}
    suppressed
    title="Show more options"
    dataCy="more-button"
  />
)

export default MoreOption
