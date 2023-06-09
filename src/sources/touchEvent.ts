export default function touchEventFp() {
  let bolTouchEnabled
  let bolOut

  bolTouchEnabled = false
  bolOut = null

  try {
    if (document.createEvent('TouchEvent')) {
      bolTouchEnabled = true
    }
    bolOut = bolTouchEnabled
    return bolOut
  } catch (ignore) {
    bolOut = bolTouchEnabled
    return bolOut
  }
}
