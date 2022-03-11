import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'
import { selectSessionViewIndex } from '../../../Store/emailDetailSlice'
import { useAppSelector } from '../../../Store/hooks'
import * as S from './EmailPositionStyles'
import * as GS from '../../../styles/globalStyles'
import labelApi from '../../../data/labelApi'
import { selectLabelIds } from '../../../Store/labelsSlice'

const EXPLANATION =
  'This shows on what email you are of all the emails in this GMail box.'

const EmailPosition = () => {
  const sessionViewIndex = useAppSelector(selectSessionViewIndex)
  const labelIds = useAppSelector(selectLabelIds)
  const [totalThreads, setTotalThreads] = useState(0)
  const [loadingState, setLoadingState] = useState('idle')

  useEffect(() => {
    let mounted = true
    const fetchLabel = async () => {
      const response = await labelApi().fetchSingleLabel(labelIds[0])
      try {
        if (response) {
          mounted && setTotalThreads(response.threadsTotal)
        }
      } finally {
        mounted && setLoadingState('loaded')
      }
    }
    fetchLabel()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <S.Wrapper>
      {loadingState === 'loaded' ? (
        <Tooltip title={EXPLANATION}>
          <GS.TextMutedParagraph>
            {sessionViewIndex + 1} / {totalThreads}
          </GS.TextMutedParagraph>
        </Tooltip>
      ) : (
        <CircularProgress size={10} />
      )}
    </S.Wrapper>
  )
}

export default EmailPosition
