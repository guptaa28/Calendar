export const SET_CALENDER_DATE = "SET_CALENDER_DATE"
export const ADD_EVENT = "ADD_EVENT"
export const UPDATE_EVENT = "UPDATE_EVENT"
export const DELETE_EVENT = "DELETE_EVENT"
export const ADD_CONFLICT = "ADD_CONFLICT"

export const setCalenderDate = (data) => ({
  type: SET_CALENDER_DATE,
  data
})

export const addEvent = (data) => ({
  type: ADD_EVENT,
  data
})

export const updateEvent = (data) => ({
  type: UPDATE_EVENT,
  data
})

export const deleteEvent = (data) => ({
  type: DELETE_EVENT,
  data
})

export const addConflict = (data) => ({
  type: ADD_CONFLICT,
  data
})
