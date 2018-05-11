import React from "react"
import Date from "./Date"

const Row = ({
  date,
  weekArr,
  month,
  year,
  rowCount,
  setCalenderDate,
}) => (
  <div className="row">
    {
      weekArr.map((arr, i) => (
        <Date
          day={arr}
          date={date}
          month={month}
          year={year}
          dayCount={rowCount ? i : -1}
          setCalenderDate={setCalenderDate}
        />
      ))
    }
  </div>
)

export default Row
