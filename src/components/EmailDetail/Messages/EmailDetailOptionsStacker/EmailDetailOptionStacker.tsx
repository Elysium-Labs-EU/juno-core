import { useState } from 'react'

import StyledTooltip from 'components/Elements/StyledTooltip'
import * as keyConstants from 'constants/keyConstants'
import useKeyPress from 'hooks/useKeyPress'
import { QiAlt } from 'images/svgIcons/quillIcons'

import * as S from './EmailDetailOptionsStackerStyles'

const EmailDetailOptionStacker = ({
  firstOption,
  secondOption,
  prioritizeSecondOption,
}: {
  firstOption: JSX.Element
  secondOption: JSX.Element
  prioritizeSecondOption: boolean
}) => {
  const [isAltActive, setIsAltActive] = useState(false)
  const KeyALtListener = useKeyPress(keyConstants.KEY_SPECIAL.altOnlyKey)
  const prioritization = prioritizeSecondOption
    ? [secondOption, firstOption]
    : [firstOption, secondOption]

  const handleClick = () => {
    setIsAltActive((prevState) => !prevState)
  }

  return (
    <S.Wrapper>
      <S.ButtonWrapper altActive={KeyALtListener || isAltActive}>
        <S.FirstOptionContainer className="first-option">
          {prioritization[0]}
        </S.FirstOptionContainer>
        <S.SecondOptionContainer className="second-option">
          {prioritization[1]}
        </S.SecondOptionContainer>
      </S.ButtonWrapper>
      <StyledTooltip title="This is a stack - press ALT to show the alternative">
        <S.StackIndicator onClick={handleClick}>
          <QiAlt
            strokeWidth={isAltActive ? 3 : undefined}
            color={
              isAltActive
                ? 'var(--color-neutral-800)'
                : 'var(--color-neutral-400)'
            }
          />
        </S.StackIndicator>
      </StyledTooltip>
    </S.Wrapper>
  )
}

export default EmailDetailOptionStacker
