export const listAddEmail = (email) => {
  return {
    type: 'LIST-ADD-EMAIL',
    payload: email,
  }
}

export const listRemoveEmail = (selectedBreedId) => {
  return {
    type: 'LIST-REMOVE-EMAIL',
    payload: selectedBreedId,
  }
}
