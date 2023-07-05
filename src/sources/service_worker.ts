declare let window: any
const serviceWorkerVersion = (): object => {
  const localStorage = window.localStorage
  return localStorage.getItem('serviceWorkerUpdated') || false
}

export default serviceWorkerVersion
