import React, { useEffect } from 'react'
import EmailList from './EmailList'
import { connect } from 'react-redux'
import { fetchLabelIds } from './../Store/actions'

const mapStateToProps = (state) => {
  const { baseLoaded } = state
  return { baseLoaded }
}

const LABEL = 'Juno/To Do'

const Home = ({ baseLoaded, dispatch }) => {
  useEffect(() => {
    if (baseLoaded) {
      dispatch(fetchLabelIds(LABEL))
    }
  }, [baseLoaded])

  return <EmailList />
}

export default connect(mapStateToProps)(Home)
