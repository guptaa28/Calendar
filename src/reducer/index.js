import { combineReducers } from "redux"
import { reducer as formReducer } from 'redux-form'

import app from "../components/App/reducer"
const appReducer = combineReducers({
  app,
  form: formReducer,
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
