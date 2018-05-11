import * as actions from "./action"
const initialState = {
  calenderDate: "",
  eventData: {},
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case actions.SET_CALENDER_DATE:
      return {
        ...state,
        calenderDate: action.data,
      }
    case actions.ADD_EVENT:
    case actions.UPDATE_EVENT: {
      const { date, id, values } = action.data
      return {
        ...state,
        eventData: {
          ...state.eventData,
          [date]: {
            ...state.eventData[date],
            [id]: values,
          },
        },
      }
    }
    case actions.DELETE_EVENT: {
      const { date, id } = action.data
      delete state.eventData[date][id]
      return {
        ...state,
      }
    }
    case actions.ADD_CONFLICT: {
      const { date, id } = action.data
      return {
        ...state,
        eventData: {
          ...state.eventData,
          [date]: {
            ...state.eventData[date],
            [id]: {
              ...state.eventData[date][id],
              conflict: true,
            }
          }
        }
      }
    }
    default:
      return state
  }
}
