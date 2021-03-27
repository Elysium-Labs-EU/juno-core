import { useHistory } from 'react-router-dom'

function BackButton() {
  const history = useHistory()

  const navigateBack = () => {
    history.go(-1)
  }

  return (
    <button className="btn btn-sm btn-light" onClick={navigateBack}>
      Back
    </button>
  )
}

export default BackButton
