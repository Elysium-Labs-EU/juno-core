import { ACTION_TYPE } from '../actions'
import { createApiClient } from '../data/api'

const api = createApiClient()
const dispatch = useDispatch()

export const LoadEmails = async (labelIds, nextPageToken) => {
  if (nextPageToken) {
    const tempMetaList = await api.getAdditionalMessages(
      labelIds,
      nextPageToken
    )
    const appendedList = metaList.concat(tempMetaList.message.threads)
    console.log('appendedList', appendedList)
    dispatch({
      type: ACTION_TYPE.LIST_ADD_EMAIL,
      payload: appendedList,
    })
    dispatch({
      type: ACTION_TYPE.SET_NEXTPAGETOKEN,
      payload: tempMetaList.message.nextPageToken,
    })
    LoadEmailDetails(metaList)
  } else {
    const tempMetaList = await api.getInitialMessages(labelIds)
    dispatch({
      type: ACTION_TYPE.LIST_ADD_EMAIL,
      payload: tempMetaList.message.threads,
    })
    dispatch({
      type: ACTION_TYPE.SET_NEXTPAGETOKEN,
      payload: tempMetaList.message.nextPageToken,
    })
    LoadEmailDetails(metaList)
  }
}

export const LoadEmailDetails = async (metaList) => {
  console.log('metaList', metaList)
  console.log(metaList.length)
  // setNextPageToken(metaList2.nextPageToken)
  // metaList.threads.forEach(async (item) => {
  metaList.length > 0 &&
    metaList.forEach(async (item) => {
      const tempEmailList = await api.getMessageDetail(item.id)
      console.log('tempEmailList', tempEmailList)
      console.log('emailList', emailList)
      const appendedEmailList = emailList.push(tempEmailList)
      console.log('appendedEmailList', appendedEmailList)
      dispatch({
        type: ACTION_TYPE.LIST_ADD_DETAIL,
        payload: appendedEmailList,
      })
      // setEmailList((prevState) => [...prevState, emailList])
    })
}
