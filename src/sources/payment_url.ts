declare let window: any
const getPaymentUrl = (): object => {
  const localStorage = window.localStorage
  return localStorage.getItem('paymentUrl') || false
}

export default getPaymentUrl
