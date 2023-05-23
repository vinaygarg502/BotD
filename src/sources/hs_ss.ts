declare let window: any

const checkSessionStorage = (): string => {
  const sessionStorage = window.sessionStorage
  return sessionStorage
}
export default checkSessionStorage
