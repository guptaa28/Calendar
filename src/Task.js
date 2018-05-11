import React, { Component } from "react"

class Task extends Component {
  state = {
    isOpen: false,
  }

  handleTaskClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  handleDeleteBtnClick = (e) => {
    const { selectedDate, deleteEvent, id } = this.props
    deleteEvent({
      date: selectedDate,
      id,
    })
    e.stopPropagation()
  }

  render() {
    const { data, handleUpdateBtnClick, id } = this.props
    return (
      <div>
        { this.state.isOpen
            ? (
              <div>
                <div>
                  <label>Title</label>
                  <p>{data.title}</p>
                </div>
                <div>
                  <label>Time</label>
                  <p>{data.startTime} - {data.endTime}</p>
                </div>
                <div>
                  <label>Description</label>
                  <p>{data.description}</p>
                </div>
                <div>
                  <button onClick={(e) => { handleUpdateBtnClick(id, e) }}>Update</button>
                  <button onClick={this.handleDeleteBtnClick}>Delete</button>
                </div>
              </div>
            )
          : (
            <div onClick={this.handleTaskClick} className="task-grid">
              <p>{data.title}</p>
              <p>{data.startTime} - {data.endTime}</p>
              <div>
                <button onClick={(e) => { handleUpdateBtnClick(id, e) }}>Update</button>
                <button onClick={this.handleDeleteBtnClick}>Delete</button>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default Task
