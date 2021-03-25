import React, { useEffect, useState } from 'react'
import { createApiClient } from '../data/api'
import './../App.scss'
import EmailListItem from './EmailListItem/EmailListItem'

const api = createApiClient()

const EmailList = (labels) => {
  const [emailList, setEmailList] = useState([])
  const [nextPageToken, setNextPageToken] = useState(undefined)
  const labelIds = labels.Labels

  const LoadEmails = async (labelIds, nextPageToken) => {
    if (nextPageToken) {
      const metaList = await api.getAdditionalThreads(labelIds, nextPageToken)
      if (metaList) {
        setEmails(metaList)
      }
    } else {
      const metaList = await api.getInitialThreads(labelIds)
      if (metaList) {
        setEmails(metaList)
      }
    }
  }

  useEffect(() => {
    LoadEmails(labelIds)
  }, [labelIds])

  const setEmails = async (metaList) => {
    setNextPageToken(metaList.nextPageToken)
    metaList.message.threads.forEach(async (item) => {
      const emailList = await api.getMessageDetail(item.id)
      setEmailList((prevState) => [...prevState, emailList])
    })
  }

  const loadNextPage = (labelIds, nextPageToken) => {
    LoadEmails(labelIds, nextPageToken)
  }

  const renderEmailList = (emailList) => {
    return (
      <>
        <div className="scroll">
          <div className="tlOuterContainer">
            <div className="thread-list">
              {emailList ? (
                <div className="base">
                  {emailList.map((email) => (
                    <EmailListItem href={`mail/${email.id}`} key={email.id} email={email} />
                  ))}
                </div>
              ) : (
                <h2>Loading</h2>
              )}
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-sm btn-light" onClick={() => loadNextPage(labelIds, nextPageToken)}>Load more</button>
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
