import React, { useEffect } from 'react'
import EmailList from './EmailList'
import { connect } from 'react-redux'
import { setCurrentLabels } from './../Store/actions'

const LABEL = ['INBOX']

const Home = ({ dispatch }) => {
  useEffect(() => {
    dispatch(setCurrentLabels(LABEL))
  }, [])

  return <EmailList />
}

export default connect()(Home)
