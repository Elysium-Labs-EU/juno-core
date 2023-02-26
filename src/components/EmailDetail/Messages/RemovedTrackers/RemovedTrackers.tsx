import { Modal } from '@mui/material'
import { useState } from 'react'
import { FiShield } from 'react-icons/fi'

import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import StyledTooltip from 'components/Elements/StyledTooltip'
import * as themeConstants from 'constants/themeConstants'
import { QiEscape } from 'images/svgIcons/quillIcons'
import { Span } from 'styles/globalStyles'

import {
  REMOVED_TRACKERS,
  REMOVED_TRACKER,
  ICON_SIZE,
  JUNO_TRACKERS,
} from './RemovedTrackersConstants'
import * as S from './RemovedTrackersStyles'

interface IDetailModal {
  showDialog: boolean
  setShowDialog: (value: boolean) => void
  blockedTrackers: Array<string>
}

const DetailModal = ({
  showDialog,
  setShowDialog,
  blockedTrackers,
}: IDetailModal) => (
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
                <Span muted>{convertedToString.href}</Span>
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
}: Pick<IDetailModal, 'blockedTrackers'>) => {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <S.Wrapper>
        <S.Inner>
          <StyledTooltip title={JUNO_TRACKERS}>
            <S.StyledButton onClick={() => setShowDialog(true)}>
              <S.InnerButton>
                <div className="icon">
                  <FiShield
                    size={10}
                    color={themeConstants.color.neutral[400]}
                  />
                </div>
                <Span small>{REMOVED_TRACKERS}</Span>
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
