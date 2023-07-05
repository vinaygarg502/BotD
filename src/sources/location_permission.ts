declare let window: any
const isLocationPermission = (): object => {
  const localStorage = window.localStorage
  return localStorage.getItem('isLocationPermissionGiven') || false
}

export default isLocationPermission
