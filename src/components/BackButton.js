import { useHistory } from 'react-router-dom'

function BackButton() {
  const history = useHistory()

  const navigateToHome = () => {
    history.push('/')
  }

  return (
    <button className="btn btn-sm btn-light" onClick={navigateToHome}>
      Back
    </button>
  )
}

export default BackButton
