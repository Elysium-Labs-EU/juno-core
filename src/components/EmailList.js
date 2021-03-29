import React, { useEffect, useState } from 'react'
import { createApiClient } from '../data/api'
import './../App.scss'
import EmailListItem from './emailListItem/EmailListItem'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION_TYPE } from '../actions'

const api = createApiClient()
const selectMetaList = (state) => state.metaList
const selectNextPageToken = (state) => state.nextPageToken
const selectEmailList = (state) => state.emailList

const EmailList = (labels) => {
  // const [emailList, setEmailList] = useState([])
  const metaList = useSelector(selectMetaList)
  const nextPageToken = useSelector(selectNextPageToken)
  const emailList = useSelector(selectEmailList)
  const dispatch = useDispatch()
  const labelIds = labels.Labels

  const LoadEmails = async (labelIds, nextPageToken) => {
    if (nextPageToken) {
      const tempMetaList = await api.getAdditionalThreads(
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
      const tempMetaList = await api.getInitialThreads(labelIds)
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

  useEffect(() => {
    // metaList.length >
    LoadEmails(labelIds)
  }, [labelIds])

  const LoadEmailDetails = async (metaList) => {
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
        dispatch({ type: ACTION_TYPE.LIST_ADD_DETAIL, payload: appendedEmailList })
        // setEmailList((prevState) => [...prevState, emailList])
      })
  }

  const loadNextPage = (labelIds, nextPageToken) => {
    LoadEmails(labelIds, nextPageToken)
  }
  // const emailList = useSelector(selectEmailList)
  const renderEmailList = (emailList) => {
    console.log('rendered', emailList)
    return (
      <>
        <div className="scroll">
          <div className="tlOuterContainer">
            <div className="thread-list">
              {emailList ? (
                <div className="base">
                  {emailList.map((email) => (
                    <EmailListItem key={email.message.id} email={email} />
                  ))}
                </div>
              ) : (
                <h2>Loading</h2>
              )}
            </div>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-sm btn-light"
                onClick={() => loadNextPage(labelIds, nextPageToken)}
              >
                Load more
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {emailList.length > 0 ? (
        renderEmailList(emailList)
      ) : (
        <>
          <h3>Fetching emails</h3>
        </>
      )}
    </>
  )
}

export default EmailList
