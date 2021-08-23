export const BASE_API_URL = process.env.REACT_APP_BACKEND_URL

export const errorHandeling = (err) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err)
    if (err.response) {
      return err.response.data
    }
  }
  return err.response.data
}
