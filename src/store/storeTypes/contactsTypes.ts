import { z } from 'zod'

export const Contact = z.object({
  name: z.string().nullable().optional(),
  emailAddress: z.string().nullable().optional(),
})

export type TContact = z.infer<typeof Contact>

const ContactState = z.object({
  allContacts: z.array(Contact).nullable(),
  contactNextPageToken: z.string(),
  contactsLoaded: z.string(),
})

export type TContactState = z.infer<typeof ContactState>
