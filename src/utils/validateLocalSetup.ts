/**
 * @function validateLocalSetup
 * @param backendURL the env configured backendURL
 * @param cloudFlag the flag indicating if the cloud or local version backend should be useed
 * @returns {Error} throws an error if the inputted values are of an invalid combination
 */

export default function validateLocalSetup(
  backendURL: string,
  cloudFlag: string
) {
  if (cloudFlag === undefined || cloudFlag === null) {
    throw Error(
      'You forgot to set a flag indicating to connect to the local backend or cloud backend.'
    )
  }
  // These checks are only valid for local development setup
  if (process.env.NODE_ENV === 'development') {
    if (backendURL?.includes('localhost') && cloudFlag === 'true') {
      throw Error(
        'This combination is invalid. Your backendURL is pointing to localhost and you have a flag indicating to connect to the cloud backend.'
      )
    }
    if (!backendURL?.includes('localhost') && cloudFlag === 'false') {
      throw Error(
        'This combination is invalid. Your backendURL is pointing to a cloud environment and you have a flag indicating to connect to the local backend.'
      )
    }
  }
}
