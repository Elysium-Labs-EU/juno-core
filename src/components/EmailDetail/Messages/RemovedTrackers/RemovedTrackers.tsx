import { useState } from 'react'
import { FiShield } from 'react-icons/fi'

import CustomDialog from 'components/Elements/Dialog/CustomDialog'
import Stack from 'components/Elements/Stack/Stack'
import StyledTooltip from 'components/Elements/StyledTooltip'
import * as themeConstants from 'constants/themeConstants'
import { Span } from 'styles/globalStyles'

import {
  REMOVED_TRACKERS,
  REMOVED_TRACKER,
  JUNO_TRACKERS,
} from './RemovedTrackersConstants'
import * as S from './RemovedTrackersStyles'

interface IDetailModal {
  blockedTrackers: Array<string>
  setShowDialog: (value: boolean) => void
  showDialog: boolean
}

const DetailModal = ({
  showDialog,
  setShowDialog,
  blockedTrackers,
}: IDetailModal) => (
  <CustomDialog
    customOnClose={() => setShowDialog(false)}
    disableDefaultOnClose
    open={showDialog}
    modalAriaLabel="removed-trackers"
    modalTitle={`${blockedTrackers.length}
        ${blockedTrackers.length > 1 ? REMOVED_TRACKERS : REMOVED_TRACKER}`}
  >
    <Stack direction="vertical">
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
    </Stack>
  </CustomDialog>
)

const RemovedTrackers = ({
  blockedTrackers,
}: Pick<IDetailModal, 'blockedTrackers'>) => {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <div>
        <StyledTooltip title={JUNO_TRACKERS}>
          <S.StyledButton onClick={() => setShowDialog(true)}>
            <Stack spacing="mini">
              <div>
                <FiShield size={10} color={themeConstants.color.neutral[400]} />
              </div>
              <Span small>{REMOVED_TRACKERS}</Span>
            </Stack>
          </S.StyledButton>
        </StyledTooltip>
      </div>
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
