import styled from 'styled-components'

import * as global from 'constants/globalConstants'
import { useAppSelector } from 'store/hooks'
import { selectStorageLabels } from 'store/labelsSlice'
import type { TLabelState } from 'store/storeTypes/labelsTypes'
import capFirstLetterOnly from 'utils/capFirstLetterOnly'
import { onlyLegalLabelObjects } from 'utils/onlyLegalLabels'

import CustomLabel from './CustomLabel/CustomLabel'

const Wrapper = styled.div`
  div:not(:first-child) {
    margin-left: var(--spacing-0-5);
  }
`

interface EmailLabelProps {
  labelIds: TLabelState['labelIds']
}

// Filter out the Category_ labels and Important labels etc. If there is nothing left, label it as Archive
const EmailLabel = ({ labelIds }: EmailLabelProps) => {
  const storageLabels = useAppSelector(selectStorageLabels)
  const staticOnlyLegalLabels = onlyLegalLabelObjects({
    labelIds,
    storageLabels,
  })

  const legalLabel = () => {
    if (staticOnlyLegalLabels.length > 0) {
      return staticOnlyLegalLabels.map((labelName) =>
        capFirstLetterOnly(labelName.name)
      )
    }
    return [capFirstLetterOnly(global.ARCHIVE_LABEL)]
  }

  return (
    <Wrapper data-testid="email-label">
      {legalLabel().map((label) => (
        <CustomLabel key={label} labelName={label} />
      ))}
    </Wrapper>
  )
}

export default EmailLabel
