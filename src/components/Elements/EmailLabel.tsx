import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../Store/hooks'
import { selectStorageLabels } from '../../Store/labelsSlice'
import { LabelIdName } from '../../Store/labelsTypes'
import CustomLabel from './CustomLabel'

const Wrapper = styled.div`
      div:not(:first-child) {
    margin-left: 5px;
  }`

// Filter out the Category_ labels and Important labels etc. If there is nothing left, label it as Archive
const EmailLabel = ({ labelNames }: { labelNames: string[] }) => {
  const storageLabels = useAppSelector(selectStorageLabels)

  const idMapStorageLabels = storageLabels.map(
    (label) => label.id
  )
  const filterArray = labelNames.filter((el: any) =>
    idMapStorageLabels.includes(el)
  )

  const newArray: LabelIdName[] = []
  for (let i = 0; i < filterArray.length; i += 1) {
    const pushItem = storageLabels.find((item) => item.id === filterArray[i])
    if (pushItem) newArray.push(pushItem)
  }

  const legalLabel = () => {
    if (newArray.length > 0) {
      return newArray.map((labelName) => labelName.name.charAt(0).toUpperCase() + labelName.name.slice(1).toLowerCase())
    }
    return ['Archive']
  }

  return (
    <Wrapper>
      {legalLabel().map((label) => <CustomLabel key={label} labelName={label} />)}
    </Wrapper>
  )
}

export default EmailLabel