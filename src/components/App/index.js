import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { setCalenderDate, addEvent, updateEvent, deleteEvent, addConflict } from "./action"
import { getFormValues, initialize } from "redux-form"
import get from "lodash/get"

const mapStateToProps = state => {
  const selectedDate = get(state.app, "calenderDate", "")
  const eventData = get(state.app, "eventData", [])
  const { title, startTime, endTime, description } = getFormValues("eventform")(state) || {}

  return {
    selectedDate,
    eventData,
    formValues: {
      title,
      startTime,
      endTime,
      description,
    },
  }
}

const mapDispatchToProps = dispatch => ({
  initialize(data) {
    dispatch(initialize("eventform", data))
  },
  ...bindActionCreators({
    setCalenderDate,
    addEvent,
    updateEvent,
    deleteEvent,
    addConflict,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)
