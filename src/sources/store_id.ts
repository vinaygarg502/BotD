declare let window: any
const getStoreId = (): object => {
  const localStorage = window.localStorage
  return localStorage.getItem('storeId') || false
}

export default getStoreId
