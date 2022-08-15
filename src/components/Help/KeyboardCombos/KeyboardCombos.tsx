import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectActiveModal, setActiveModal } from '../../../store/utilsSlice'
import * as S from './KeyboardCombosStyles'
import * as local from '../../../constants/keycomboConstants'
import * as global from '../../../constants/globalConstants'
import * as GS from '../../../styles/globalStyles'
import getUserAgent from '../../../utils/getUserAgent'
import { AppDispatch } from '../../../store/store'
import CustomModal from '../../Elements/Modal/CustomModal'

const handleClose = (dispatch: AppDispatch) => dispatch(setActiveModal(null))

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

const KeyboardCombos = () => {
  const activeModal = useAppSelector(selectActiveModal)
  const dispatch = useAppDispatch()

  return (
    <CustomModal
      open={activeModal === global.ACTIVE_MODAL_MAP.keyboard}
      handleClose={() => handleClose(dispatch)}
      modalTitle={local.MODAL_TITLE}
      modalAriaLabel="keyboard-shortcuts"
      subTitle={
        <GS.TextMutedParagraph>
          {local.MODAL_OS_SUB}{' '}
          <span style={{ color: `var(--color-black)` }}>{getUserAgent()}</span>
        </GS.TextMutedParagraph>
      }
    >
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
    </CustomModal>
  )
}

export default KeyboardCombos