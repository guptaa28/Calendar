import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Row from "./Row"
import Container from "./components/App/index"
import TaskSection from "./TaskSection"


class App extends Component {

  state = {
    date: "",
    monthArr: [],
    month: "",
    year: "",
  }

  componentWillMount() {
    this.getMonthData()
  }

  getMonthData = () => {
    let currentDate = new Date()
    let currentMonth = currentDate.getMonth() + 1
    let currentYear = currentDate.getFullYear()
    let currentMonthDays = this.getMonthDays(currentYear, currentMonth)
    let currentDay = new Date(currentMonth + "/" + 1 + "/" + currentYear).getDay()
    let currentMonthArr = this.transformDataToArr(currentMonthDays, currentDay)
    this.setState({
      date: currentDate.getDate(),
      monthArr: currentMonthArr,
      month: currentMonth,
      year: currentYear,
    })
  }

  transformDataToArr = (count, day) => {
    let arr, temp, matched, currentCount
    matched = false
    arr=[]
    currentCount = 1
    for(let i =0 ; i< 6; i++) {
      temp = []
      for(let j = 0; j < 7; j++) {
        if ((matched || day === j) && currentCount <= count ) {
          temp.push(currentCount++)
          matched = true
        } else {
          temp.push(0)
        }
      }
      arr.push(temp)
      if (currentCount > count) return arr
    }
    return arr
  }

  getMonthDays = (year, month) =>
      month === 2
		? 28 + (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0)
		: (month % 2 ^ month <= 7 ? 30 : 31)



  render() {
     const { date, monthArr, month, year } = this.state
     const {
       setCalenderDate,
       selectedDate,
       eventData,
       addEvent,
       updateEvent,
       deleteEvent,
       formValues,
       initialize,
       addConflict,
     } = this.props
     return (
        <div className="App">
          <div className="calender">
            {
              monthArr.map((arr, i) => (
                <Row
                  date={date}
                  weekArr={arr}
                  month={month}
                  year={year}
                  rowCount={i === 0 ? true : false}
                  setCalenderDate={setCalenderDate}
                />
              ))
            }
          </div>
          { selectedDate &&
            <div className="task-section">
              <TaskSection
                selectedDate={selectedDate}
                eventData={eventData}
                addEvent={addEvent}
                updateEvent={updateEvent}
                deleteEvent={deleteEvent}
                formValues={formValues}
                month={month}
                year={year}
                initialize={initialize}
                addConflict={addConflict}
              />
            </div>
          }
        </div>
     )
  }
}

export default Container(App)
