import { z } from 'zod'

import { gmailV1SchemaLabelSchema } from './gmailBaseTypes/gmailTypes'

export type TGmailV1SchemaLabelSchema = z.infer<typeof gmailV1SchemaLabelSchema>

const LabelState = z.object({
  labelIds: z.array(z.string()),
  loadedInbox: z.array(z.string()),
  // We are extending the schema here, since we are 100% sure that a storageLabel will have a name.
  storageLabels: z.array(
    gmailV1SchemaLabelSchema.pick({ id: true, type: true }).extend({
      name: z.string(),
    })
  ),
})

export type TLabelState = z.infer<typeof LabelState>
