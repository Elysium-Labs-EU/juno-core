import { z } from 'zod'

export const EmailDetailState = z.object({
  coreStatus: z.string().nullable(),
  currEmail: z.string(),
  isReplying: z.boolean(),
  isForwarding: z.boolean(),
  viewIndex: z.number(),
  sessionViewIndex: z.number(),
  fetchStatus: z.enum(['idle', 'pending', 'fulfilled', 'rejected']),
})

export type TEmailDetailState = z.infer<typeof EmailDetailState>
