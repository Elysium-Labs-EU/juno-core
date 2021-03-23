import React, { useEffect, useState } from 'react'
import { createApiClient } from '../data/api'
import './../App.scss'
import EmailListItem from './EmailListItem'

const api = createApiClient()

function EmailList() {
  const [emailList, setEmailList] = useState([])

  useEffect(() => {
    const LoadEmails = async () => {
      const metaList = await api.getThreads()
      metaList.forEach(async (item) => {
        const emailList = await api.getMessageDetail(item.id)
        setEmailList((prevState) => [...prevState, emailList])
      })
    }
  LoadEmails()
  },[])

  return (
    <div>
      <div className="scroll">
        <div className="tlOuterContainer">
          <div className="thread-list">
            {emailList ? (
              <div className="base">
                {emailList.map((email) => (
                  <EmailListItem
                    href={`mail/${email.id}`}
                    key={email.id}
                    email={email}
                  />
                ))}
              </div>
            ) : (
              <h2>Loading</h2>
            )}
          </div>
          <div className="d-flex justify-content-center">
            <button>Test</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailList
