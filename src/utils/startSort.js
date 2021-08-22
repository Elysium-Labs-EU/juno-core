const startSort = (props) => {
  const { history, labelURL, emailList, emailListIndex } = props

  if (history && labelURL && emailList && emailListIndex > -1) {
    return history.push(
      `/mail/${labelURL}/${emailList[emailListIndex].threads[0].id}/messages`
    )
  }
  return null
}

export default startSort
