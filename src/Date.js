import React, { Component } from "react"

class Date extends Component {

  getHeader = (dayCount) => {
    switch(dayCount) {
      case 0 : return "Sun"
      case 1 : return "Mon"
      case 2 : return "Tue"
      case 3 : return "Wed"
      case 4 : return "Thu"
      case 5 : return "Fri"
      case 6 : return "Sat"
      default : return ""
    }
  }

  handleDateClick = () => {
    const { setCalenderDate, day } = this.props
    if (day !== 0) {
      setCalenderDate(day)
    }
  }

  render() {
    const {
      date,
      day,
      dayCount,
    } = this.props
    return (
      <div
        className={"date" + (day === date ? " match" : "")}
        onClick={this.handleDateClick}
      >
        { dayCount !== -1 &&
          <div className="header">
            { this.getHeader(dayCount) }
          </div>
        }
        { day !== 0 &&
          <div>{day}</div>
        }
      </div>
    )
  }
}

export default Date
