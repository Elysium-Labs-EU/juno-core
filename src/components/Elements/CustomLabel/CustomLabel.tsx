import styled from 'styled-components'

const Wrapper = styled.div`
  -webkit-box-align: center;
  align-items: center;
  background-color: var(--color-neutral-100);
  border-color: var(--color-neutral-200);
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  cursor: default;
  display: inline-flex;
  font-size: var(--text-xs);
  font-weight: 500;
  height: 21px;
  letter-spacing: 0.05em;
  line-height: 21px;
  outline: 0px;
  padding: 0px var(--spacing-1);
  user-select: none;
  vertical-align: top;
  white-space: nowrap;
  transition: background-color 0.2s ease 0s, border-color 0.2s ease 0s,
    color 0.2s ease 0s;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const CustomLabel = ({ labelName }: { labelName: string }) => (
  <Wrapper>
    <span title={labelName}>{labelName}</span>
  </Wrapper>
)

export default CustomLabel
