import React, { useEffect, useState } from 'react'
import { createApiClient } from '../data/api'
import './../App.scss'
import EmailListItem from './emailListItem/EmailListItem'
import { useDispatch, useSelector } from 'react-redux'

const api = createApiClient()
// const selectMetaList = (state) => state.metaList
// const selectEmailList = (state) => state.emailList

const EmailList = (labels) => {
  const [emailList, setEmailList] = useState([])
  const [nextPageToken, setNextPageToken] = useState(undefined)
  // const metaList = useSelector(selectMetaList)
  const dispatch = useDispatch()
  const labelIds = labels.Labels

  const LoadEmails = async (labelIds, nextPageToken) => {
    if (nextPageToken) {
      const tempMetaList = await api.getAdditionalThreads(
        labelIds,
        nextPageToken
      )
      dispatch({
        type: 'LIST-ADD-EMAIL',
        payload: tempMetaList.message.threads,
      })
      setNextPageToken(tempMetaList.message.nextPageToken)
      // metaList && LoadEmailDetails(metaList)
      tempMetaList && LoadEmailDetails(tempMetaList.message)
    } else {
      const tempMetaList = await api.getInitialThreads(labelIds)
      dispatch({
        type: 'LIST-ADD-EMAIL',
        payload: tempMetaList.message.threads,
      })
      setNextPageToken(tempMetaList.message.nextPageToken)
      // metaList && LoadEmailDetails(metaList)
      tempMetaList && LoadEmailDetails(tempMetaList.message)
    }
  }

  useEffect(() => {
    LoadEmails(labelIds)
  }, [labelIds])

  const LoadEmailDetails = async (tempMetaList) => {
    console.log('metaList', tempMetaList)
    // setNextPageToken(metaList2.nextPageToken)
    // metaList.threads.forEach(async (item) => {
    tempMetaList &&
      tempMetaList.threads.forEach(async (item) => {
        const emailList = await api.getMessageDetail(item.id)
        // dispatch({ type: 'LIST-ADD-DETAILS', payload: tempEmailList })
        setEmailList((prevState) => [...prevState, emailList])
      })
  }

  const loadNextPage = (labelIds, nextPageToken) => {
    LoadEmails(labelIds, nextPageToken)
  }
  // const emailList = useSelector(selectEmailList)
  const renderEmailList = (emailList) => {
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
