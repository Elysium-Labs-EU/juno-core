import { FiMoreHorizontal } from 'react-icons/fi'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as local from '../../../constants/emailDetailConstants'

interface IMoreOption {
  setShowMenu: Function
  showMenu: boolean
}

const MoreOption = ({ setShowMenu, showMenu }: IMoreOption) => (
  <CustomButton
    icon={<FiMoreHorizontal />}
    onClick={() => setShowMenu(!showMenu)}
    label={local.BUTTON_MORE}
    suppressed
  />
)

export default MoreOption
