import { useState } from 'react'
import { FiShield } from 'react-icons/fi'
import { Modal } from '@mui/material'
import * as S from './RemovedTrackersStyles'
import * as GS from '../../../../styles/globalStyles'
import * as themeConstants from '../../../../constants/themeConstants'
import StyledTooltip from '../../../Elements/StyledTooltip'

const REMOVED_TRACKERS = 'Trackers removed'
const REMOVED_TRACKER = 'Tracker removed'
const JUNO_TRACKERS = 'Juno has blocked trackers on the email.'

const DetailModal = ({
  showDialog,
  setShowDialog,
  blockedTrackers,
}: {
  showDialog: boolean
  setShowDialog: (value: boolean) => void
  blockedTrackers: Attr[]
}) => (
  <Modal
    open={showDialog}
    onClose={() => setShowDialog(false)}
    aria-labelledby="modal-settings"
    aria-describedby="modal-settings-box"
  >
    <S.Dialog>
      <S.DialogHeader>
        {blockedTrackers.length}{' '}
        {blockedTrackers.length > 1 ? REMOVED_TRACKERS : REMOVED_TRACKER}
      </S.DialogHeader>
      <S.DialogInner>
        {blockedTrackers.map((item) => {
          if (item?.nodeValue) {
            const convertedToString = new URL(item.nodeValue)
            return (
              <S.BlockedItemInformation key={convertedToString.href}>
                <p>{convertedToString.host}</p>
                <GS.TextMutedSpan>{convertedToString.href}</GS.TextMutedSpan>
              </S.BlockedItemInformation>
            )
          }
          return null
        })}
      </S.DialogInner>
    </S.Dialog>
  </Modal>
)

const RemovedTrackers = ({ blockedTrackers }: { blockedTrackers: Attr[] }) => {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <S.Wrapper>
        <S.Inner>
          <StyledTooltip title={JUNO_TRACKERS}>
            <S.StyledButton onClick={() => setShowDialog(true)}>
              <S.InnerButton>
                <div className="icon">
                  <FiShield size={10} color={themeConstants.colorGrey} />
                </div>
                <GS.TextSpanSmall>{REMOVED_TRACKERS}</GS.TextSpanSmall>
              </S.InnerButton>
            </S.StyledButton>
          </StyledTooltip>
        </S.Inner>
      </S.Wrapper>
      {showDialog && (
        <DetailModal
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          blockedTrackers={blockedTrackers}
        />
      )}
    </>
  )
}

export default RemovedTrackers
