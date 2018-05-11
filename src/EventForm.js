import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { formatTimeText } from "./Utils"

const TIME_REGEX = /^([01]?[0-9]{1}|2[0-3]{1}):[0-5]{1}[0-9]{1}/i

const validate = values => {
  const errors = {}
  const { startTime, endTime } = values
  const requiredFields = [
    "title",
    "description",
    "startTime",
    "endTime"
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required field"
    }
  })
  if (startTime && !TIME_REGEX.test(startTime)) {
    errors.startTime = "Invalid start time"
  }
  if (endTime && !TIME_REGEX.test(endTime)) {
    errors.endTime = "Invalid end time"
  }
  if (endTime < startTime) errors.endTime = "End time cannot be less than Start time"
  return errors
}

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const renderDateTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom,
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    onKeyUp={(event) => {
      const { target } = event
      const { value } = target
      let newValue = value.replace(/\s\s+/g, " ")
      newValue = formatTimeText(newValue, event.keyCode)

      if (newValue !== value) {
        const oldLength = value.length
        const oldIdx = target.selectionStart
        const newIdx = Math.max(0, newValue.length - oldLength + oldIdx)

        target.value = newValue

        target.selectionStart = newIdx
        target.selectionEnd = newIdx
      }

      if (input.onKeyUp) input.onKeyUp(event)
    }}
  />
)

class EventForm extends Component {

  componentWillMount() {
    const { initialize, data } = this.props
    const { title, startTime, endTime, description} = data || {}
    if (data) {
      initialize({
        title,
        startTime,
        endTime,
        description,
      })
    }
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, data } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="title"
            component={renderTextField}
            label="Title"
          />
        </div>
        <div>
          <div>
            <Field
              name="startTime"
              component={renderDateTextField}
              label="Start Time"
            />
          </div>
          <div>
            <Field
              name="endTime"
              component={renderDateTextField}
              label="End Time"
            />
          </div>
        </div>
        <div>
          <Field
            name="description"
            component={renderTextField}
            label="Description"
            multiLine={true}
            rows={3}
          />
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>
            {data ? "Update" : "ADD"}
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: "eventform",
  validate,
})(EventForm)
