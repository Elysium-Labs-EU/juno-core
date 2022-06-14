import { FiShield } from 'react-icons/fi'
import { SmallTextMuted } from '../../EmailDetailStyles'
import * as S from './RemovedTrackersStyles'

const REMOVED_TRACKERS = 'Trackers removed'

const RemovedTrackers = () => (
  <S.Wrapper>
    <S.Inner>
      <FiShield size={10} />
      <SmallTextMuted>{REMOVED_TRACKERS}</SmallTextMuted>
    </S.Inner>
  </S.Wrapper>
)

export default RemovedTrackers
