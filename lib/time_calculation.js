export let time, currentTime
export let count = 0

export function startTime () {
  time = 0
  currentTime = 0
}

export function secondsToHms (d) {
  let h = Math.floor(d / 3600)
  let m = Math.floor(d % 3600 / 60)
  let s = Math.floor(d % 3600 % 60)

  let hDisplay = h > 0 ? h + (h === 1 ? ' h, ' : ' h, ') : ''
  let mDisplay = m > 0 ? m + (m === 1 ? ' m, ' : ' m, ') : ''
  let sDisplay = s > 0 ? s + ' s' : ''
  return hDisplay + mDisplay + sDisplay
}

export function tick () {
  count += 1
  if (count === 60) {
    time += 1
    count = 0
  }
  currentTime = secondsToHms(time)
}
