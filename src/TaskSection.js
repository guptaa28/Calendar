import React, { Component } from "react"
import isEmpty from "lodash/isEmpty"
import uuid from "uuid/v4"
import Task from "./Task"
import EventForm from "./EventForm"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { checkConflict } from "./Utils"

class TaskSection extends Component {

  state = {
    showAddForm: false,
    showUpdateForm: false,
    updateFormId: "",
  }

  handleAddBtnClick = () => {
    this.setState({
      showAddForm: !this.state.showAddForm,
    })
  }

  handleUpdateBtnClick = (id, e) => {
    this.setState({
      showUpdateForm: !this.state.showUpdateForm,
      updateFormId: id,
    })
    e.stopPropagation()
  }

  handleAddForm = () => {
    const { addEvent, formValues, selectedDate, eventData, addConflict } = this.props
    const conflictList = checkConflict(formValues, eventData, selectedDate)
    const hasConflict = conflictList.length > 0
    addEvent({
      date: selectedDate,
      id: uuid(),
      values: formValues,
      conflict: hasConflict,
    })
    if (hasConflict) {
      conflictList.forEach(conflict => addConflict(conflict(selectedDate, conflict.id)))
    }

    this.handleAddBtnClick()
  }

  handleUpdateForm = () => {
    const { updateEvent, formValues, selectedDate, eventData, addConflict } = this.props
    const { updateFormId } = this.state
    const conflictList = checkConflict(formValues, eventData, selectedDate)
    const hasConflict = conflictList.length > 0
    updateEvent({
      date: selectedDate,
      id: updateFormId,
      values: formValues,
      conflict: hasConflict,
    })
    if (hasConflict) {
      conflictList.forEach(conflict => addConflict(conflict(selectedDate, conflict.id)))
    }
    this.setState({
      showUpdateForm: !this.state.showUpdateForm,
      updateFormId,
    })
  }

  render() {
    const { selectedDate, eventData, addEvent, updateEvent, deleteEvent, month, year, initialize } = this.props
    const { showAddForm, showUpdateForm, updateFormId } = this.state
    const dataForSelectedDate = eventData[selectedDate]
    return (
      <div>
        <h1> Date: {selectedDate}/{month}/{year} </h1>
        { !isEmpty(dataForSelectedDate) && !showAddForm && !showUpdateForm &&
          <div>
            <h4> Events </h4>
            <hr />
            <div>
              {
                Object.keys(dataForSelectedDate).map(id => (
                  <Task
                    id={id}
                    data={dataForSelectedDate[id]}
                    selectedDate={selectedDate}
                    deleteEvent={deleteEvent}
                    handleUpdateBtnClick={this.handleUpdateBtnClick}
                  />
                ))
              }
            </div>
          </div>
        }
        { !showAddForm && !showUpdateForm &&
          <div className="add-event-div">
            <button
              className="add-button"
              onClick={this.handleAddBtnClick}
            > Add event </button>
            { isEmpty(dataForSelectedDate) &&
              <h1> There are no events for the selected day </h1>
            }
          </div>
        }
        { showAddForm &&
          <MuiThemeProvider>
            <EventForm onSubmit={this.handleAddForm} />
          </MuiThemeProvider>
        }
        {
          showUpdateForm &&
          <MuiThemeProvider>
            <EventForm
              onSubmit={this.handleUpdateForm}
              data={dataForSelectedDate[updateFormId]}
              initialize={initialize}
            />
          </MuiThemeProvider>
        }
      </div>
    )
  }
}

export default TaskSection
