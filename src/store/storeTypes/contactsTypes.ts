import { z } from 'zod'

export interface IContactState {
  allContacts: any
  contactNextPageToken: string
  contactsLoaded: string
}

export const ContactState = z.object({
  allContants: z.any(),
  contactNextPageToken: z.string(),
  contactsLoaded: z.string(),
})

export type TContactState = z.infer<typeof ContactState>

export interface IContact {
  name: string
  emailAddress: string
}
