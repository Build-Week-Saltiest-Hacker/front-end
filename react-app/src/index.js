import React from 'react'
import ReactDOM from 'react-dom'

//Components
import App from './App'

/***************************************************************/
/***********************     REDUX    **************************/
/***************************************************************/
//Redux Dependencies
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

//Middleware
import thunk from 'redux-thunk'

//Reducers
import rootReducer from './store/reducers'

//Redux store
const store = createStore(rootReducer, applyMiddleware(thunk))

/***************************************************************/

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
)

