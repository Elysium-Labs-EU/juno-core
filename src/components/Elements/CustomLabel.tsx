import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: var(--color-neutral-100);
  border-color: var(--color-neutral-200);
  display: inline-flex;
  height: 21px;
  padding: 0px 8px;
  line-height: 21px;
  border-radius: 5px;
  cursor: default;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.05em;
  outline: 0px;
  vertical-align: top;
  user-select: none;
  white-space: nowrap;
  -webkit-box-align: center;
  align-items: center;
  border-width: 1px;
  border-style: solid;
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
