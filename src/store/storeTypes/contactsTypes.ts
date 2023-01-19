export interface IContactState {
  allContacts: any
  contactNextPageToken: string
  contactsLoaded: string
}

export interface IContact {
  name: string
  emailAddress: string
}
