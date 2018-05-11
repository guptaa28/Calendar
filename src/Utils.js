export const formatTimeText = (timeText, keyCode) => {
  if (timeText) {
    const arr = timeText.split(":")
    return arr.map((inputTime, i) => {
      if (keyCode === 8) return removeTimeText(i, inputTime, arr.length)
      return addTimeText(i, inputTime)
    }).join("")
  }
  return ""
}

const addTimeText = (index, timeText) => {
  const inputNumber = Number.parseInt(timeText, 10)
  const firstNumber = Number.parseInt(timeText.slice(0, 1), 10)
  switch (index) {
    case 0: {
      if (inputNumber >= 0) {
        if (firstNumber > 2) {
          return `0${timeText}:`
        }
        if (timeText.length === 2) return `${timeText}:`
        return timeText
      }
      return ""
    }
    case 1: {
      if (inputNumber >= 0) {
        if (firstNumber > 5) {
          return `0${timeText}`
        }
        return timeText
      }
      return ""
    }
    default: return ""
  }
}

const removeTimeText = (index, timeText, length) => {
  switch (index) {
    case 0: {
      if (length > 1) return `${timeText}:`
      return ""
    }
    case 1: {
      return ""
    }
    default: return ""
  }
}

export const checkConflict = (currentData, eventData, date) => {
  const dataObj = eventData.date || {}
  const { startTime, endTime } = currentData
  return Object.keys(dataObj).filter(data =>
    dataObj[data].endTime > startTime || dataObj.startTime < endTime ||
    (dataObj[data].startTime > startTime && dataObj[data].endTime < endTime)
  )
}
