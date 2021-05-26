import React, { useEffect } from 'react'
import EmailList from '../EmailList'
import { connect } from 'react-redux'
import { fetchLabelIds, setCurrentLabels } from '../../Store/actions'

const mapStateToProps = (state) => {
  const { baseLoaded, storageLabels } = state
  return { baseLoaded, storageLabels }
}

const LABEL = 'Juno/To Do'

const Todo = ({ baseLoaded, storageLabels, dispatch }) => {
  useEffect(() => {
    if (baseLoaded && !storageLabels.some((label) => label.name === LABEL)) {
      dispatch(fetchLabelIds(LABEL))
      console.log('here1')
    } else if (
      baseLoaded &&
      storageLabels.some((label) => label.name === LABEL)
    ) {
      console.log('here2')
      const labelId = storageLabels.filter((label) => label.name === LABEL)
      dispatch(setCurrentLabels([labelId[0].id]))
    }
  }, [baseLoaded])

  return <EmailList />
}

export default connect(mapStateToProps)(Todo)
