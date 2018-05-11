import { createStore, applyMiddleware } from "redux"
import { createLogger } from "redux-logger"

import rootReducer from "../reducer/index"


const middlewares = []
middlewares.push(createLogger({
  level: "info",
  collapsed: true,
}))

const enhancer = applyMiddleware(...middlewares)

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer)
  return store
}
