import { useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import { FiAlertCircle } from 'react-icons/fi'
import { selectSessionViewIndex } from '../../../Store/emailDetailSlice'
import { useAppSelector } from '../../../Store/hooks'
import * as S from './EmailPositionStyles'
import * as GS from '../../../styles/globalStyles'
import * as global from '../../../constants/globalConstants'
import labelApi from '../../../data/labelApi'
import { selectLabelIds } from '../../../Store/labelsSlice'
import StyledCircularProgress from '../../Elements/StyledCircularProgress'

const EXPLANATION =
  'This shows on what email you are of all the emails in this GMail box.'

const EmailPosition = () => {
  const sessionViewIndex = useAppSelector(selectSessionViewIndex)
  const labelIds = useAppSelector(selectLabelIds)
  const [totalThreads, setTotalThreads] = useState(0)
  const [loadingState, setLoadingState] = useState(global.LOAD_STATE_MAP.idle)

  useEffect(() => {
    let mounted = true
    const fetchLabel = async () => {
      try {
        setLoadingState(global.LOAD_STATE_MAP.loading)
        const response = await labelApi().fetchSingleLabel(labelIds[0])
        if (response) {
          mounted && setTotalThreads(response.threadsTotal)
        }
      } catch (err) {
        setLoadingState(global.LOAD_STATE_MAP.error)
      } finally {
        mounted && setLoadingState(global.LOAD_STATE_MAP.loaded)
      }
    }
    fetchLabel()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <S.Wrapper>
      {loadingState === global.LOAD_STATE_MAP.loaded && (
        <Tooltip title={EXPLANATION}>
          <GS.TextMutedParagraph style={{ fontSize: 13 }}>
            {sessionViewIndex + 1} / {totalThreads}
          </GS.TextMutedParagraph>
        </Tooltip>
      )}
      {loadingState === global.LOAD_STATE_MAP.loading && (
        <StyledCircularProgress size={10} />
      )}
      {loadingState === global.LOAD_STATE_MAP.error && <FiAlertCircle />}
    </S.Wrapper>
  )
}

export default EmailPosition
