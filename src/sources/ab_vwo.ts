declare let window: any
const getabsmall = (): object => {
  const localStorage = window.localStorage
  return localStorage.getItem('ab_test_vwo_id') || false
}

export default getabsmall
