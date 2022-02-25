import { FiChevronLeft } from 'react-icons/fi'
import CustomButton from './CustomButton'
import * as global from '../../../constants/globalConstants'
import { selectCoreStatus } from '../../../Store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import { selectComposeEmail } from '../../../Store/composeSlice'
import navigateBack from '../../../utils/navigateBack'

const BackButton = () => {
  const coreStatus = useAppSelector(selectCoreStatus)
  const dispatch = useAppDispatch()
  const composeEmail = useAppSelector(selectComposeEmail)

  return (
    <CustomButton
      onClick={() => navigateBack({ dispatch, coreStatus, composeEmail })}
      label={global.BUTTON_BACK}
      suppressed
      icon={<FiChevronLeft />}
    />
  )
}

export default BackButton

BackButton.defaultProps = {
  coreStatus: null,
}
