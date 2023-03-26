import type { Draft, PayloadAction } from '@reduxjs/toolkit'

interface IReduxKeyPresentInObject<Payload, State> {
  key: keyof State
  payload: PayloadAction<Payload>['payload']
  state: Draft<State>
}

// Only update the state of the key if the key is present in the payload
export default function reduxKeyPresentInObject<
  State extends Record<string, unknown>,
  Payload extends Record<string, unknown>
>({ key, payload, state }: IReduxKeyPresentInObject<Payload, State>) {
  if (key in payload) {
    const newState = {
      ...state,
      [key]: payload[key as keyof typeof payload],
    }
    return newState
  }
  return state
}
