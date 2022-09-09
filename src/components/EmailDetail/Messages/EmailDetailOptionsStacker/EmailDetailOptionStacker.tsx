import * as S from './EmailDetailOptionsStackerStyles'
import * as keyConstants from '../../../../constants/keyConstants'
import useKeyPress from '../../../../hooks/useKeyPress'
import { QiAlt } from '../../../../images/svgIcons/quillIcons'
import StyledTooltip from '../../../Elements/StyledTooltip'

const EmailDetailOptionStacker = ({
  firstOption,
  secondOption,
  prioritizeSecondOption,
}: {
  firstOption: JSX.Element
  secondOption: JSX.Element
  prioritizeSecondOption: boolean
}) => {
  const KeyALtListener = useKeyPress(keyConstants.KEY_ALT)
  const prioritization = prioritizeSecondOption
    ? [secondOption, firstOption]
    : [firstOption, secondOption]

  return (
    <S.Wrapper>
      <S.ButtonWrapper altActive={KeyALtListener}>
        <S.FirstOptionContainer className="first-option">
          {prioritization[0]}
        </S.FirstOptionContainer>
        <S.SecondOptionContainer className="second-option">
          {prioritization[1]}
        </S.SecondOptionContainer>
      </S.ButtonWrapper>
      <StyledTooltip title="This is a stack - press ALT to show the alternative">
        <S.StackIndicator>
          <QiAlt color="var(--color-grey)" />
        </S.StackIndicator>
      </StyledTooltip>
    </S.Wrapper>
  )
}

export default EmailDetailOptionStacker
