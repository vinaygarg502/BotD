declare let window: any
const isAddress = (): object => {
  const localStorage = window.localStorage
  return localStorage.getItem('isAddressOnCart') || false
}

export default isAddress
