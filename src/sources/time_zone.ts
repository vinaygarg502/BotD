export default function timezone() {
  let dtDate
  let numOffset
  let numGMTHours
  let numOut

  const strOnError = 'Error'
  dtDate = null
  numOffset = null
  numGMTHours = null
  numOut = null

  try {
    dtDate = new Date()
    numOffset = dtDate.getTimezoneOffset()
    numGMTHours = (numOffset / 60) * -1
    numOut = numGMTHours
    return numOut
  } catch (err) {
    return strOnError
  }
}
