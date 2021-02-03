import React from 'react'
import ReactDOM from 'react-dom'
import './App.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.css'
import { createStore } from 'redux'
import allReducers from './reducers'
import { Provider } from 'react-redux'
import { createApiClient } from './data/api'

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const api = createApiClient()

const main = async () => {
  await api.initGapi()
  // await api.authenticate()
  // await api.loadClient()
}

const loadMainfunction = async () => {
  api.authenticate()
  await api.loadClient()
}

setTimeout(() => {
  loadMainfunction()
}, 1000)

main().catch((err) => {
  console.error(err)
})

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
