declare let window: any
const previousScreen = (): object => {
  const localStorage = window.localStorage
  return localStorage.getItem('previousScreen') || false
}

export default previousScreen
