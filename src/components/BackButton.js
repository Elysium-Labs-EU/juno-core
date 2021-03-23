import { useHistory } from 'react-router-dom'

function BackButton() {
  const history = useHistory()

  function navigateToHome() {
    history.push('/')
  }

  return (
    <button className="btn btn-sm btn-outline-secondary" onClick={navigateToHome}>
      Back
    </button>
  )
}

export default BackButton
