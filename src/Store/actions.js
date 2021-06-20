import axios from 'axios'
import isEmpty from 'lodash/isEmpty'
import base64url from 'base64url'
import createApiClient from '../data/api'
import {
  FilteredEmailList,
  FilteredMetaList,
  NavigateNextMail,
  multipleIncludes,
} from '../utils'

const api = createApiClient()

const BASE_MAX_RESULTS = 20
const DRAFT = 'DRAFT'

export const ACTION_TYPE = {
  SET_BASE_LOADED: 'SET_BASE_LOADED',
  SET_SERVICE_UNAVAILABLE: 'SET_SERVICE_UNAVAILABLE',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_LOADED_INBOX: 'SET_LOADED_INBOX',
  SET_NEXTPAGETOKEN: 'SET_NEXTPAGETOKEN',
  SET_CURR_EMAIL: 'SET_CURR_EMAIL',
  SET_VIEW_INDEX: 'SET_VIEW_INDEX',
  SET_LABEL_IDS: 'SET_LABEL_IDS',
  SET_STORAGE_LABELS: 'SET_STORAGE_LABELS',
  LIST_ADD_META: 'LIST_ADD_META',
  LIST_ADD_ITEM_META: 'LIST_ADD_ITEM_META',
  LIST_REMOVE_ITEM_META: 'LIST_REMOVE_ITEM_META',
  LIST_ADD_DETAIL: 'LIST_ADD_DETAIL',
  LIST_REMOVE_DETAIL: 'LIST_REMOVE_DETAIL',
  LIST_ADD_ITEM_DETAIL: 'LIST_ADD_ITEM_DETAIL',
  LIST_REMOVE_ITEM_DETAIL: 'LIST_REMOVE_ITEM_DETAIL',
  LIST_UPDATE_DETAIL: 'LIST_UPDATE_DETAIL',
  LIST_ADD_DRAFT: 'LIST_ADD_DRAFT',
  LIST_UPDATE_DRAFT: 'LIST_UPDATE_DRAFT',
  LIST_REMOVE_DRAFT: 'LIST_REMOVE_DRAFT',
  SET_COMPOSE_EMAIL: 'SET_COMPOSE_EMAIL',
  UPDATE_COMPOSE_EMAIL: 'UPDATE_COMPOSE_EMAIL',
  RESET_COMPOSE_EMAIL: 'RESET_COMPOSE_EMAIL',
}

export const setBaseLoaded = (baseLoaded) => ({
  type: ACTION_TYPE.SET_BASE_LOADED,
  payload: baseLoaded,
})

export const setServiceUnavailable = (serviceUnavailableError) => ({
  type: ACTION_TYPE.SET_SERVICE_UNAVAILABLE,
  payload: serviceUnavailableError,
})

export const setIsLoading = (isLoading) => ({
  type: ACTION_TYPE.SET_IS_LOADING,
  payload: isLoading,
})

export const setLoadedInbox = (loadedInbox) => ({
  type: ACTION_TYPE.SET_LOADED_INBOX,
  payload: loadedInbox,
})

export const setNextPageToken = (nextPageToken) => {
  return {
    type: ACTION_TYPE.SET_NEXTPAGETOKEN,
    payload: nextPageToken,
  }
}

export const setCurrentEmail = (threadId) => {
  return {
    type: ACTION_TYPE.SET_CURR_EMAIL,
    payload: threadId,
  }
}

export const setViewingIndex = (requestBody) => {
  return {
    type: ACTION_TYPE.SET_VIEW_INDEX,
    payload: requestBody,
  }
}

export const setStorageLabels = (labels) => {
  return {
    type: ACTION_TYPE.SET_STORAGE_LABELS,
    payload: labels,
  }
}

export const setCurrentLabels = (labels) => {
  return {
    type: ACTION_TYPE.SET_LABEL_IDS,
    payload: labels,
  }
}

export const listAddMeta = (metaList) => {
  return {
    type: ACTION_TYPE.LIST_ADD_META,
    payload: metaList,
  }
}

export const listAddItemMeta = (metaList) => {
  return {
    type: ACTION_TYPE.LIST_ADD_ITEM_META,
    payload: metaList,
  }
}

export const listRemoveItemMeta = (props) => {
  return {
    type: ACTION_TYPE.LIST_REMOVE_ITEM_META,
    payload: props,
  }
}

export const listAddDetail = (emailList) => {
  return {
    type: ACTION_TYPE.LIST_ADD_DETAIL,
    payload: emailList,
  }
}

export const listRemoveDetail = (emailList) => {
  return {
    type: ACTION_TYPE.LIST_REMOVE_DETAIL,
    payload: emailList,
  }
}

export const listAddItemDetail = (emailList) => {
  return {
    type: ACTION_TYPE.LIST_ADD_ITEM_DETAIL,
    payload: emailList,
  }
}

export const listRemoveItemDetail = (emailList) => {
  return {
    type: ACTION_TYPE.LIST_REMOVE_ITEM_DETAIL,
    payload: emailList,
  }
}

export const listUpdateDetail = (emailList) => {
  return {
    type: ACTION_TYPE.LIST_UPDATE_DETAIL,
    payload: emailList,
  }
}
export const listAddDraft = (draft) => {
  return {
    type: ACTION_TYPE.LIST_ADD_DRAFT,
    payload: draft,
  }
}
export const listUpdateDraft = (draft) => {
  return {
    type: ACTION_TYPE.LIST_UPDATE_DRAFT,
    payload: draft,
  }
}
export const listRemoveDraft = (draft) => {
  return {
    type: ACTION_TYPE.LIST_REMOVE_DRAFT,
    payload: draft,
  }
}

export const setComposeEmail = (body) => {
  return {
    type: ACTION_TYPE.SET_COMPOSE_EMAIL,
    payload: body,
  }
}

export const updateComposeEmail = (body) => {
  return {
    type: ACTION_TYPE.UPDATE_COMPOSE_EMAIL,
    payload: body,
  }
}

export const resetComposeEmail = () => {
  return {
    type: ACTION_TYPE.RESET_COMPOSE_EMAIL,
    composeEmail: {},
  }
}

export const loadDraftList = () => {
  return async (dispatch) => {
    try {
      const draftList = await api.getDrafts()
      if (draftList.message.resultSizeEstimate > 0) {
        dispatch(listAddDraft(draftList.message.drafts))
      } else {
        return null
      }
      return null
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error getting Draft list.'))
    }
    return null
  }
}

export const loadEmailDetails = (labeledThreads) => {
  return async (dispatch, getState) => {
    try {
      const { threads, labels, nextPageToken } = labeledThreads
      if (threads) {
        const buffer = []
        const loadCount = threads.length

        if (threads.length > 0) {
          threads.forEach(async (item) => {
            const threadDetail = await api.getThreadDetail(item.id)
            buffer.push(threadDetail.thread)
            if (buffer.length === loadCount) {
              dispatch(
                listAddDetail({
                  labels,
                  threads: buffer,
                  nextPageToken: nextPageToken ?? null,
                })
              )
              // If base isn't fully loaded yet, add the additional loadedInbox
              if (!getState().baseLoaded) {
                dispatch(setLoadedInbox(labels))
              }
              // If base isn't fully loaded yet but all current inboxes are loaded, unveil the app.
              if (
                !getState().baseLoaded &&
                getState().storageLabels.length ===
                  getState().loadedInbox.length
              ) {
                dispatch(setIsLoading(false))
                dispatch(setBaseLoaded(true))
              }
              // If base is fully loaded, set loading to false, as a backup.
              if (getState().baseLoaded) {
                dispatch(setIsLoading(false))
                // In case the base is already loaded, but an additional inbox is loaded.
                if (
                  !multipleIncludes(
                    labels,
                    getState().storageLabels.map((label) => label.id)
                  )
                ) {
                  dispatch(setLoadedInbox(labels))
                  // Check if the label is complete object, if not filter out the object via an api listing.
                  labels.map((element) => {
                    if (
                      Object.prototype.hasOwnProperty.call(element, 'name') &&
                      Object.prototype.hasOwnProperty.call(element, 'id')
                    ) {
                      return dispatch(setStorageLabels(element))
                    }
                    return api.fetchLabel().then((fetchedLabels) => {
                      if (fetchedLabels) {
                        if (fetchedLabels.message.labels.length > 0) {
                          const labelArray = fetchedLabels.message.labels
                          dispatch(
                            setStorageLabels(
                              labels.map((baseLabel) =>
                                labelArray.filter(
                                  (singleLabel) =>
                                    singleLabel.name === baseLabel
                                )
                              )
                            )
                          )
                        }
                      }
                    })
                  })
                }
              }
            }
          })
        }
      } else {
        if (
          !getState().baseLoaded &&
          labels.some(
            (val) => getState().loadedInbox.flat(1).indexOf(val) === -1
          )
        ) {
          //           dispatch(
          //   setStorageLabels(
          //     BASE_ARRAY.map((baseLabel) =>
          //       labelArray.filter((item) => item.name === baseLabel)
          //     )
          //   )
          // )
          console.log(
            labels.some(
              (val) => getState().loadedInbox.flat(1).indexOf(val) === -1
            )
          )
          console.log(labels)
          dispatch(setLoadedInbox(labels))
        }
        // console.log(`Empty Inbox for ${labels}`);
        if (
          !getState().baseLoaded &&
          getState().storageLabels.length === getState().loadedInbox.length
        ) {
          dispatch(setIsLoading(false))
          dispatch(setBaseLoaded(true))
        }
      }
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error hydrating emails.'))
    }
  }
}

const pushDraftDetails = (enhancedDraftDetails) => {
  const {
    draft,
    draft: { message },
    history,
  } = enhancedDraftDetails
  return (dispatch) => {
    try {
      console.log(message)
      const loadEmail = {
        to: message.payload.headers.find((e) => e.name === 'To')
          ? message.payload.headers.find((e) => e.name === 'To').value
          : '',
        subject: message.payload.headers.find((e) => e.name === 'Subject')
          ? message.payload.headers.find((e) => e.name === 'Subject').value
          : '',
        body:
          message.payload.body.size > 0
            ? base64url
                .decode(message.payload.body.data)
                .replace(/<[^>]*>/g, '') ?? ''
            : '',
      }
      if (draft.id) {
        dispatch(setCurrentEmail(draft.id))
        history.push(`/compose/${draft.id}`)
      } else {
        history.push(`/compose/`)
      }
      dispatch(setComposeEmail(loadEmail))
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error setting up compose email.'))
    }
  }
}

const loadDraftDetails = (draftDetails) => {
  const { draftId, history } = draftDetails
  return async (dispatch) => {
    try {
      axios
        .get(`/api/draft/${draftId[0].id}`)
        .then((response) => {
          if (response.status === 200) {
            const { draft } = response.data
            const enhancedDraftDetails = { history, draft }
            pushDraftDetails(enhancedDraftDetails)
          }
        })
        .catch((err) => console.log(err))
        .then(
          dispatch(setServiceUnavailable('Error setting up compose email.'))
        )
    } catch (err) {
      console
        .log(err)
        .then(
          dispatch(setServiceUnavailable('Error setting up compose email.'))
        )
    }
  }
}

// Use a checkfeed of 100 items, compare this to the current MetaList, if the checkFeeds newest item
// is newer than the metaList, cut off the items from the checkfeed which are older than the newest metaList item
export const refreshEmailFeed = (params, metaList) => {
  return async (dispatch) => {
    console.log('WIP need to change listUpdateMeta function')
    console.log(params, metaList, dispatch)
    // const checkFeed = await api.getThreads(params)
    // if (checkFeed.message.threads[0].historyId > metaList[0].historyId) {
    //   const newThreads = checkFeed.message.threads.filter(
    //     (thread) => thread.historyId > metaList[0].historyId
    //   )
    //   const newThreadsObject = { message: { threads: [...newThreads] } }
    //   dispatch(listUpdateMeta(newThreads))
    //   dispatch(loadEmailDetails(newThreadsObject))
    // } else {
    //   console.log('No new messages')
    // }
  }
}

export const fetchLabelIds = (LABEL) => {
  return async (dispatch) => {
    try {
      const listAllLabels = await api.fetchLabel()
      const {
        message: { labels },
      } = listAllLabels
      if (labels) {
        const labelObject = labels.filter((label) => label.name === LABEL)
        if (labelObject.length > 0) {
          // console.log(labelObject)
          dispatch(setCurrentLabels([labelObject[0].id]))
          dispatch(setStorageLabels([labelObject[0].id]))
        } else {
          dispatch(setServiceUnavailable('Error fetching label.'))
        }
      } else {
        dispatch(setServiceUnavailable('Error fetching label.'))
      }
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error fetching label.'))
    }
    // TO-DO: What if multiple labels are used
  }
}

export const createLabel = (label) => {
  return async (dispatch) => {
    try {
      const body = {
        labelVisibility: label.labelVisibility ?? 'labelShow',
        messageListVisibility: label.messageListVisibility ?? 'show',
        name: label.name ?? label,
      }
      return axios
        .post(`/api/labels`, body)
        .then((res) => {
          if (res.status === 200) {
            dispatch(setStorageLabels(res.data.message))
          } else {
            dispatch(setServiceUnavailable('Error creating label.'))
          }
        })
        .catch((err) => console.log(err))
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error creating label.'))
    }
    return null
  }
}

export const UpdateMailLabel = (props) => {
  const {
    messageId,
    request,
    request: { addLabelIds, removeLabelIds },
    history,
    labelURL,
  } = props

  return async (dispatch, getState) => {
    try {
      const { metaList } = getState()
      const { emailList } = getState()
      const filteredCurrentMetaList =
        metaList &&
        removeLabelIds &&
        FilteredMetaList({ metaList, labelIds: removeLabelIds })
      const filteredTargetMetaList =
        metaList &&
        addLabelIds &&
        FilteredMetaList({ metaList, labelIds: addLabelIds })
      const filteredCurrentEmailList =
        emailList &&
        removeLabelIds &&
        FilteredEmailList({ emailList, labelIds: removeLabelIds })
      const filteredTargetEmailList =
        emailList &&
        addLabelIds &&
        FilteredEmailList({ emailList, labelIds: addLabelIds })
      return axios
        .patch(`/api/message/${messageId}`, request)
        .then((res) => {
          if (res.status === 200) {
            if (addLabelIds) {
              const activeMetaObjArray =
                filteredCurrentMetaList[0].threads.filter(
                  (item) => item.id === messageId
                )
              dispatch(
                listAddItemMeta({
                  activeMetaObjArray,
                  filteredTargetMetaList,
                })
              )
              const activEmailObjArray =
                filteredCurrentEmailList[0].threads.filter(
                  (item) => item.id === messageId
                )
              dispatch(
                listAddItemDetail({
                  activEmailObjArray,
                  filteredTargetEmailList,
                })
              )
            }
            if (removeLabelIds) {
              dispatch(
                listRemoveItemMeta({
                  messageId,
                  filteredCurrentMetaList,
                })
              )
              dispatch(
                listRemoveItemDetail({
                  messageId,
                  filteredCurrentEmailList,
                })
              )
            }
            if (getState().currEmail && !getState().labelIds.includes(DRAFT)) {
              const { viewIndex } = getState()
              NavigateNextMail({
                history,
                labelURL,
                filteredCurrentMetaList,
                viewIndex,
              })
            }
          } else {
            dispatch(setServiceUnavailable('Error updating label.'))
          }
        })
        .catch((err) => console.log(err))
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error updating label.'))
    }
    return null
  }
}

export const OpenDraftEmail = (props) => {
  const { history, id, DRAFT_LABEL, messageId } = props
  // console.log(typeof selectIndex, selectIndex)
  return async (dispatch, getState) => {
    try {
      if (isEmpty(getState().draftList)) {
        axios
          .get('/api/drafts/')
          .then((res) => {
            if (res.status === 200) {
              console.log(res)
              if (res.data.message.resultSizeEstimate > 0) {
                const {
                  data: {
                    message: { drafts },
                  },
                } = res
                const draftId = drafts.filter(
                  (draft) => draft.message.id === messageId
                )
                console.log(draftId)
                if (!isEmpty(draftId)) {
                  dispatch(loadDraftDetails({ draftId, history }))
                }
              } else {
                dispatch(
                  setServiceUnavailable('Error setting up compose email.')
                )
              }
            }
          })
          .catch((err) => console.log(err))
          .then(
            dispatch(setServiceUnavailable('Error setting up compose email.'))
          )
      }
      // console.log(response)
      const { emailList } = getState()
      const { draftList } = getState()
      const draftBox = FilteredEmailList({ emailList, labelIds: DRAFT_LABEL })

      console.log('id', id)
      console.log('messageid', messageId)
      const selectedEmail =
        draftBox && draftBox[0].threads.filter((item) => item.id === id)
      const selectIndex = messageId
        ? draftList.findIndex((element) => element.message.id === messageId)
        : 0

      console.log(draftList[selectIndex].id)
      console.log('selectIndex', selectIndex)
      const filteredDraftEmail =
        selectedEmail &&
        selectedEmail[0].messages.filter((item) => item.id === messageId)

      // TODO: make selectedEmail into a variable selector, the user can select any message and continue from there.
      console.log(filteredDraftEmail[0].payload)
      console.log(filteredDraftEmail)
      // const enhancedDraftDetails = {
      //   draft: filteredDraftEmail[0],
      // }
      // dispatch(pushDraftDetails())
      const loadEmail = {
        to: filteredDraftEmail[0].payload.headers.find((e) => e.name === 'To')
          ? filteredDraftEmail[0].payload.headers.find((e) => e.name === 'To')
              .value
          : '',
        subject: filteredDraftEmail[0].payload.headers.find(
          (e) => e.name === 'Subject'
        )
          ? filteredDraftEmail[0].payload.headers.find(
              (e) => e.name === 'Subject'
            ).value
          : '',
        body:
          filteredDraftEmail[0].payload.body.size > 0
            ? base64url
                .decode(filteredDraftEmail[0].payload.body.data)
                .replace(/<[^>]*>/g, '') ?? ''
            : base64url
                .decode(filteredDraftEmail[0].payload.parts[0].body.data)
                .replace(/<[^>]*>/g, '') ?? '',
      }
      console.log(loadEmail)
      if (draftList[selectIndex].id) {
        dispatch(setCurrentEmail(draftList[selectIndex].id))
        history.push(`/compose/${draftList[selectIndex].id}`)
      } else {
        history.push(`/compose/`)
      }
      dispatch(setComposeEmail(loadEmail))
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error setting up compose email.'))
    }
  }
}

export const TrackComposeEmail = (props) => {
  return async (dispatch, getState) => {
    try {
      if (isEmpty(getState().composeEmail)) {
        dispatch(setComposeEmail(props))
      }
      if (!isEmpty(getState().composeEmail)) {
        dispatch(updateComposeEmail(props))
      }
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error updating compose email.'))
    }
  }
}

export const SendComposedEmail = (props) => {
  const { history, messageId } = props
  console.log(messageId)
  return async (dispatch, getState) => {
    try {
      const composedEmail = getState().composeEmail
      console.log(composedEmail)
      if (Object.keys(composedEmail).length >= 3) {
        if (messageId) {
          const body = { composedEmail, messageId }
          return axios
            .post('/api/send-draft', body)
            .then((res) => {
              if (res.status === 200) {
                console.log(res)
                history.push(`/`)
                dispatch(resetComposeEmail())
                dispatch(setCurrentEmail(''))
                // TODO: Update the redux states' to have the email in the correct boxes
                // const request = {
                //   removeLabelIds: [DRAFT],
                // }
                // dispatch(UpdateMailLabel({ request, messageId }))
              }
            })
            .catch((err) => console.log(err))
            .then(dispatch(setServiceUnavailable('Error sending email.')))
        }
        return axios
          .post('/api/send-message', composedEmail)
          .then((res) => {
            if (res.status === 200) {
              console.log(res)
              history.push(`/`)
              dispatch(resetComposeEmail())
              dispatch(setCurrentEmail(''))
            }
          })
          .catch((err) => console.log(err))
          .then(dispatch(setServiceUnavailable('Error sending email.')))
      }
      // return null
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error sending email.'))
    }
    return null
  }
}

export const loadEmails = (params) => {
  console.log(params)
  return async (dispatch, getState) => {
    try {
      if (!getState().isLoading) {
        dispatch(setIsLoading(true))
      }
      const { labelIds } = params
      const metaList = await api.getThreads(params)
      if (metaList) {
        if (metaList.message.resultSizeEstimate > 0) {
          console.log(metaList.message)
          const { threads, nextPageToken } = metaList.message
          const labeledThreads = {
            labels: labelIds,
            threads,
            nextPageToken: nextPageToken ?? null,
          }
          await dispatch(listAddMeta(labeledThreads))
          dispatch(loadEmailDetails(labeledThreads))
        } else {
          if (getState().baseLoaded) {
            dispatch(setServiceUnavailable('No feed found'))
          }
          dispatch(setLoadedInbox(labelIds))
          console.log(`Empty Inbox for ${labelIds}`)
          if (
            !getState().baseLoaded &&
            getState().storageLabels.length === getState().loadedInbox.length
          ) {
            dispatch(setIsLoading(false))
            dispatch(setBaseLoaded(true))
          }
        }
      } else {
        dispatch(setServiceUnavailable('No feed found'))
        dispatch(setIsLoading(false))
      }
    } catch (err) {
      console.log(err)
      dispatch(setIsLoading(false))
      dispatch(
        dispatch(
          setServiceUnavailable(
            'Something went wrong whilst loading Meta data.'
          )
        )
      )
    }
  }
}

export const checkBase = () => {
  const BASE_ARRAY = [
    'Juno',
    'Juno/To Do',
    'Juno/Keep',
    'Juno/Reminder',
    'INBOX',
    'SPAM',
    // 'DRAFT',
    'SENT',
  ]
  return async (dispatch) => {
    try {
      const labels = await api.fetchLabel()
      if (labels) {
        if (labels.message.labels.length > 0) {
          const labelArray = labels.message.labels
          if (
            !multipleIncludes(
              BASE_ARRAY,
              labelArray.map((item) => item.name)
            )
          ) {
            console.log('You do not have all labels.')
            BASE_ARRAY.map((item) =>
              labelArray.map((label) => label.name).includes(item)
            ).map(
              (checkValue, index) =>
                !checkValue && dispatch(createLabel(BASE_ARRAY[index]))
            )
            dispatch(setBaseLoaded(true))
          } else {
            console.log('Gotcha! All minimal required labels.')
            dispatch(
              setStorageLabels(
                BASE_ARRAY.map((baseLabel) =>
                  labelArray.filter((item) => item.name === baseLabel)
                )
              )
            )
            const prefetchedBoxes = BASE_ARRAY.map((baseLabel) =>
              labelArray.filter((item) => item.name === baseLabel)
            )
            prefetchedBoxes.forEach((label) => {
              const params = {
                labelIds: [label[0].id],
                maxResults: BASE_MAX_RESULTS,
              }
              dispatch(loadEmails(params))
            })
          }
        } else {
          dispatch(
            setServiceUnavailable('Network Error. Please try again later')
          )
        }
      } else {
        dispatch(setServiceUnavailable('Network Error. Please try again later'))
      }
    } catch (err) {
      console.log(err)
      dispatch(
        setServiceUnavailable('An error occured during loading the base.')
      )
    }
  }
}
