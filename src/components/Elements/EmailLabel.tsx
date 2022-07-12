import styled from 'styled-components'
import { useAppSelector } from '../../store/hooks'
import { selectStorageLabels } from '../../store/labelsSlice'
import onlyLegalLabelObjects from '../../utils/onlyLegalLabelObjects'
import CustomLabel from './CustomLabel'

const Wrapper = styled.div`
  div:not(:first-child) {
    margin-left: 5px;
  }
`

// Filter out the Category_ labels and Important labels etc. If there is nothing left, label it as Archive
const EmailLabel = ({ labelNames }: { labelNames: string[] }) => {
  const storageLabels = useAppSelector(selectStorageLabels)
  const staticOnlyLegalLabels = onlyLegalLabelObjects({
    labelNames,
    storageLabels,
  })

  const legalLabel = () => {
    if (staticOnlyLegalLabels.length > 0) {
      return staticOnlyLegalLabels.map(
        (labelName) =>
          labelName.name.charAt(0).toUpperCase() +
          labelName.name.slice(1).toLowerCase()
      )
    }
    return ['Archive']
  }

  return (
    <Wrapper>
      {legalLabel().map((label) => (
        <CustomLabel key={label} labelName={label} />
      ))}
    </Wrapper>
  )
}

export default EmailLabel
