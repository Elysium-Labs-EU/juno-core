export const convertArrayToString = (data) => {
  const converted = data.toString().replace(',', '-')
  return converted
}

export const FilteredMetaList = (props) => {
  const { metaList, labelIds } = props
  if (metaList.length > 0 && labelIds.length > 0) {
    return metaList.filter((threadList) =>
      threadList.labels.includes(...labelIds.flat(1))
    )
  }
  return null
}

export const FilteredEmailList = (props) => {
  const { emailList, labelIds } = props
  if (emailList.length > 0 && labelIds.length > 0) {
    return emailList.filter((threadList) =>
      threadList.labels.includes(...labelIds.flat(1))
    )
  }
  return null
}

export const FindLabel = (props) => {
  const { storageLabels, LABEL_NAME } = props
  return (
    storageLabels && storageLabels.filter((label) => label.name === LABEL_NAME)
  )
}

export const multipleIncludes = (first, second) => {
  const indexArray = first.map((el) => {
    return second.indexOf(el)
  })
  return indexArray.indexOf(-1) === -1
}

export const findPayloadHeadersData = (props) => {
  const { query, email, threadDetail } = props
  if (email) {
    if (email.messages) {
      return email.messages[0].payload.headers.find(
        (data) => data.name === query
      )
        ? email.messages[0].payload.headers.find((data) => data.name === query)
            .value
        : undefined
    }
    if (email.message) {
      return email.message.payload.headers.find((data) => data.name === query)
        ? email.message.payload.headers.find((data) => data.name === query)
            .value
        : undefined
    }
  }

  if (threadDetail.messages) {
    return threadDetail.messages[0].payload.headers.find(
      (data) => data.name === query
    )
      ? threadDetail.messages[0].payload.headers.find(
          (data) => data.name === query
        ).value
      : undefined
  }
  return null
}
