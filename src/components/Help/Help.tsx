import Modal from '@mui/material/Modal'
import { FiX } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import {
  selectShowKeyboardCombos,
  setShowKeyboardCombos,
} from '../../Store/utilsSlice'
import * as S from './HelpStyles'
import * as local from '../../constants/helpConstants'
import * as HS from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'
import getUserAgent from '../../utils/getUserAgent'

const handleClose = (dispatch: Function) =>
  dispatch(setShowKeyboardCombos(false))

interface IKeyCombos {
  title: string
  subTitle?: string
  keys: string[] | JSX.Element[]
}

const CreateSectionWithKeys = ({
  keyCombos,
  title,
  subTitle,
}: {
  keyCombos: IKeyCombos[]
  title: string
  subTitle: string
}) => (
  <S.SectionContainer>
    <div>
      <strong>{title}</strong>
    </div>
    <span>{subTitle}</span>
    {keyCombos.map((combo) => (
      <S.KeyComboContainer key={combo.title}>
        <div>{combo.title}</div>
        {combo?.subTitle && (
          <GS.TextMutedSpan>{combo?.subTitle}</GS.TextMutedSpan>
        )}
        <S.KeyBindShortcut>
          {combo.keys.map((oneKey) => (
            <span key={JSON.stringify(oneKey)}>{oneKey}</span>
          ))}
        </S.KeyBindShortcut>
      </S.KeyComboContainer>
    ))}
  </S.SectionContainer>
)

const Help = () => {
  const showKeyBoardCombos = useAppSelector(selectShowKeyboardCombos)
  const dispatch = useAppDispatch()

  return (
    <Modal
      open={showKeyBoardCombos}
      onClose={() => handleClose(dispatch)}
      aria-labelledby="modal-help"
      aria-describedby="modal-help-info"
    >
      <S.Dialog>
        <S.Inner>
          <S.HeaderRow>
            <HS.PageTitle>{local.MODAL_TITLE}</HS.PageTitle>
            <CustomIconButton
              onClick={() => handleClose(dispatch)}
              aria-label="close-help-modal"
              icon={<FiX size={16} />}
            />
          </S.HeaderRow>
          <p>
            {local.MODAL_OS_SUB} {getUserAgent()}
          </p>
          <S.Columns>
            <CreateSectionWithKeys
              title={local.GLOBAL_KEY_TITLE}
              subTitle={local.GLOBAL_KEY_SUB_TITLE}
              keyCombos={local.GLOBAL_KEY_COMBOS}
            />
            <CreateSectionWithKeys
              title={local.EMAIL_KEY_TITLE}
              subTitle={local.EMAIL_KEY_SUB_TITLE}
              keyCombos={local.EMAIL_DETAIL_COMBOS}
            />
            <CreateSectionWithKeys
              title={local.COMPOSE_KEY_TITLE}
              subTitle={local.COMPOSE_KEY_SUB_TITLE}
              keyCombos={local.COMPOSE_KEY_COMBOS}
            />
          </S.Columns>
        </S.Inner>
      </S.Dialog>
    </Modal>
  )
}

export default Help
