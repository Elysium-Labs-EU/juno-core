import React, { useEffect, useState } from 'react'
import { createApiClient } from '../data/api'
import './../App.scss'
import EmailListItem from './EmailListItem/EmailListItem'

const api = createApiClient()

function EmailList() {
  const [emailList, setEmailList] = useState([])
  const [nextPageToken, setNextPageToken] = useState(undefined)

  const LoadEmails = async (nextPageToken) => {
    if (nextPageToken) {
      const metaList = await api.getAdditionalThreads(nextPageToken)
      if (metaList) {
        setEmails(metaList)
      }
    } else {
      const metaList = await api.getInitialThreads()
      if (metaList) {
        setEmails(metaList)
      }
    }
  }

  useEffect(() => {
    LoadEmails()
  }, [])

  const setEmails = async (metaList) => {
    setNextPageToken(metaList.nextPageToken)
    metaList.threads.forEach(async (item) => {
      const emailList = await api.getMessageDetail(item.id)
      setEmailList((prevState) => [...prevState, emailList])
    })
  }

  const loadNextPage = (nextPageToken) => {
    LoadEmails(nextPageToken)
  }

  const renderEmailList = (emailList) => {
    return (
      <div>
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
              <button onClick={() => loadNextPage(nextPageToken)}>Load more</button>
            </div>
          </div>
        </div>
      </div>
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
