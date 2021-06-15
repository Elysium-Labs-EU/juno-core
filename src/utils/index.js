export const convertArrayToString = (data) => {
  const converted = data.toString().replace(',', '-')
  return converted
}

export const NavigatePreviousMail = (props) => {
  const { history, labelURL, filteredMetaList, viewIndex } = props
  const prevID = filteredMetaList[0].threads[viewIndex - 1].id
  return history.push(`/mail/${labelURL}/${prevID}`)
}

export const NavigateNextMail = (props) => {
  const {
    history,
    labelURL,
    filteredMetaList,
    filteredCurrentMetaList,
    viewIndex,
  } = props
  if (filteredCurrentMetaList) {
    const nextID = filteredCurrentMetaList[0].threads[viewIndex + 1].id
    return history.push(`/mail/${labelURL}/${nextID}`)
  }
  if (filteredMetaList) {
    const nextID = filteredMetaList[0].threads[viewIndex + 1].id
    return history.push(`/mail/${labelURL}/${nextID}`)
  }
}

export const CloseMail = (props) => {
  const { history } = props
  return history.push(`/inbox`)
}

export const startSort = (props) => {
  const { history, labelURL, metaList } = props
  // export const startSort = (history, labelURL, emailList, metaList) => {
  // return history.push(`/mail/${labelURL}/${emailList[0].thread.id}`)
  return history.push(`/mail/${labelURL}/${metaList[0].id}`)
}

export const FilteredMetaList = (props) => {
  const { metaList, labelIds } = props
  return metaList.filter((threadList) =>
    threadList.labels.includes(...labelIds)
  )
}

export const FilteredEmailList = (props) => {
  const { emailList, labelIds } = props
  return emailList.filter((threadList) =>
    threadList.labels.includes(...labelIds)
  )
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

export const getDetailBody = (props) => {
  console.log(props)
    //   if (threadDetailBody.mimeType === 'text/html') {
    //   let str = base64url.decode(`${threadDetailBody.body.data}`)
    //   // console.log('1')
    //   return <div dangerouslySetInnerHTML={{ __html: str }} />
    // } else if (threadDetailBody.mimeType === 'multipart/alternative') {
    //   let str = base64url.decode(`${threadDetailBody.parts[1].body.data}`)
    //   // console.log('2')
    //   return <div dangerouslySetInnerHTML={{ __html: str }} />
    // } else if (threadDetailBody.mimeType === 'multipart/mixed') {
    //   let str = threadDetailBody.parts[0].parts
    //     ? base64url.decode(`${threadDetailBody.parts[0].parts[1].body.data}`)
    //     : base64url.decode(`${threadDetailBody.parts[0].body.data}`)
    //   // console.log('3')
    //   return <div dangerouslySetInnerHTML={{ __html: str }} />
    // } else if (threadDetailBody.mimeType === 'multipart/related') {
    //   let body = fetchAttachment(
    //     messageId,
    //     threadDetailBody.parts[1].body.attachmentId
    //   )
    //   // console.log('4')
    //   // console.log(body)
    //   return <div dangerouslySetInnerHTML={{ __html: body.value }} />
    // } else {
    //   let str = base64url.decode(`${threadDetailBody.parts[0].body.data}`)
    //   // console.log('5')
    //   return <div dangerouslySetInnerHTML={{ __html: str }} />
    // }
}
