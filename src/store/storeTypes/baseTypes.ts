import { z } from 'zod'

import { gmailV1SchemaLabelSchema } from './gmailBaseTypes/gmailTypes'

const Profile = z.object({
  signature: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  picture: z.string().nullable().optional(),
  emailAddress: z.string().nullable().optional(),
  messagesTotal: z.number().nullable().optional(),
  threadsTotal: z.number().nullable().optional(),
  historyId: z.string().nullable().optional(),
})

export type TProfile = z.infer<typeof Profile>

const BaseState = z.object({
  baseError: z
    .object({ message: z.string(), cause: z.string().optional() })
    .nullable(),
  baseLoaded: z.boolean(),
  profile: Profile,
  isAuthenticated: z.boolean(),
})

export type TBaseState = z.infer<typeof BaseState>

const PrefetchedBoxes = z.array(gmailV1SchemaLabelSchema)

export type TPrefetchedBoxes = z.infer<typeof PrefetchedBoxes>

export interface CustomError {
  error: any
  message?: any
}
