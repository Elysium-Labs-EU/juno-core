import { z } from 'zod'

export const Contact = z.object({
  name: z.string().nullable().optional(),
  emailAddress: z.string().nullable().optional(),
})

export type TContact = z.infer<typeof Contact>

export const ContactState = z.object({
  allContacts: z.array(z.union([Contact, z.any()])),
  contactNextPageToken: z.string(),
  contactsLoaded: z.string(),
})

export type TContactState = z.infer<typeof ContactState>
