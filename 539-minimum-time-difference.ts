type Time = {
  hours: number
  minutes: number
}

function convertToTime(timeStr: string): Time {
  const [hours, minutes] = timeStr.split(':')
  return { hours: Number(hours), minutes: Number(minutes) }
}

// <0: timeA earlier, 0: equal, >0: timeB earlier
function compareTime(timeA: Time, timeB: Time): number {
  if (timeA.hours !== timeB.hours) {
    return timeA.hours - timeB.hours
  }

  return timeA.minutes - timeB.minutes
}

function calculateDifference(earlierTime: Time, laterTime: Time): number {
  const laterTimeMinutes = laterTime.hours * 60 + laterTime.minutes
  const earlierTimeMinutes = earlierTime.hours * 60 + earlierTime.minutes

  const sameDayDiff = laterTimeMinutes - earlierTimeMinutes
  const MINUTES_IN_A_DAY = 24 * 60
  const crossDayDiff = MINUTES_IN_A_DAY - laterTimeMinutes + earlierTimeMinutes

  return Math.min(sameDayDiff, crossDayDiff)
}

function findMinDifference(timePoints: string[]): number {
  const sortedTimePoints: Time[] = timePoints
    .map((timeStr) => convertToTime(timeStr))
    .sort((timeA, timeB) => compareTime(timeA, timeB))

  let minDiff = Number.POSITIVE_INFINITY

  for (let i = 0; i < sortedTimePoints.length; i++) {
    const next = (i + 1) % sortedTimePoints.length

    const earlierTime = (next === 0 ? sortedTimePoints[next] : sortedTimePoints[i])!
    const laterTime = (next === 0 ? sortedTimePoints[i] : sortedTimePoints[next])!

    minDiff = Math.min(minDiff, calculateDifference(earlierTime, laterTime))
    if (minDiff === 0) {
      return 0
    }
  }

  return minDiff
}

// Time: O(n log n), Space: O(n)
// Optimal Time: O(n), Space: O(1) - think bucket sort!
