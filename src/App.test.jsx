/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { checkBase, setBaseLoaded } from './Store/baseSlice'
import { setStorageLabels } from './Store/labelsSlice'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

// function renderComponent(state) {
//   const store = mockStore(state)
//   return [
//     render(
//       <Provider store={store}>
//         <LogIn />
//       </Provider>
//     ),
//     store,
//   ]
// }

it('should dispatch loadBase action when the store value is false', () => {
  const initialState = {}
  const store = mockStore(initialState)

  // store.dispatch(checkBase())

  return store.dispatch(checkBase()).then(() => {
    const actions = store.getActions()
    // console.log(actions)
    expect(actions[1]).toEqual(setBaseLoaded(true))
  })
  // const actions = store.getActions()
  // const expectedPayload = { type: 'base/checkBase' }
  // expect(actions).toEqual([expectedPayload])
})

// it('renders header correctly', () => {
//   const {queryByLabelText, getByLabelText} = render(
//     <CheckboxWithLabel labelOn="On" labelOff="Off" />,
//   );
// })

// const linkElement = screen.getByText(/learn react/i)
// expect(linkElement).toBeInTheDocument()
