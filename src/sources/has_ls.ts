declare let window: any
const checkLocalStorage = (): boolean => {
  const localStorage = window.localStorage
  return localStorage ? true : false
}

export default checkLocalStorage
