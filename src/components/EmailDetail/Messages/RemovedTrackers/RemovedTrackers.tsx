import { Modal } from '@mui/material'
import { useState } from 'react'
import { FiShield } from 'react-icons/fi'

import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import StyledTooltip from 'components/Elements/StyledTooltip'
import * as themeConstants from 'constants/themeConstants'
import { QiEscape } from 'images/svgIcons/quillIcons'
import * as GS from 'styles/globalStyles'


import * as S from './RemovedTrackersStyles'

const REMOVED_TRACKERS = 'Trackers removed'
const REMOVED_TRACKER = 'Tracker removed'
const JUNO_TRACKERS = 'Juno has blocked trackers on the email.'
const ICON_SIZE = 16

const DetailModal = ({
  showDialog,
  setShowDialog,
  blockedTrackers,
}: {
  showDialog: boolean
  setShowDialog: (value: boolean) => void
  blockedTrackers: string[]
}) => (
  <Modal
    open={showDialog}
    onClose={() => setShowDialog(false)}
    aria-labelledby="modal-removed-trackers"
    aria-describedby="modal-removed-trackers-box"
  >
    <S.Dialog>
      <S.DialogTop>
        <S.DialogHeader>
          {blockedTrackers.length}{' '}
          {blockedTrackers.length > 1 ? REMOVED_TRACKERS : REMOVED_TRACKER}
        </S.DialogHeader>{' '}
        <CustomIconButton
          onClick={() => setShowDialog(false)}
          aria-label="close-modal"
          icon={<QiEscape size={ICON_SIZE} />}
          title="Close"
        />
      </S.DialogTop>
      <S.DialogInner>
        {blockedTrackers.map((item) => {
          if (item) {
            const convertedToString = new URL(item)
            return (
              <S.BlockedItemInformation key={convertedToString.href}>
                <p>{convertedToString.host}</p>
                <GS.Span muted>{convertedToString.href}</GS.Span>
              </S.BlockedItemInformation>
            )
          }
          return null
        })}
      </S.DialogInner>
    </S.Dialog>
  </Modal>
)

const RemovedTrackers = ({
  blockedTrackers,
}: {
  blockedTrackers: string[]
}) => {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <S.Wrapper>
        <S.Inner>
          <StyledTooltip title={JUNO_TRACKERS}>
            <S.StyledButton onClick={() => setShowDialog(true)}>
              <S.InnerButton>
                <div className="icon">
                  <FiShield size={10} color={themeConstants.color.gray[300]} />
                </div>
                <GS.Span small>{REMOVED_TRACKERS}</GS.Span>
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
