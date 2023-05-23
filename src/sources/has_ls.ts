declare let window: any
const checkLocalStorage = (): string => {
  const localStorage = window.localStorage
  return localStorage
}

export default checkLocalStorage
