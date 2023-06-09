declare let window: any
const generateHash = async (hashValue: string) => {
  const utf8 = new TextEncoder().encode(hashValue)
  const hashBuffer = await window.crypto.subtle.digest('SHA-512', utf8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((bytes) => bytes.toString(16).padStart(2, '0')).join('')
  return hashHex
}
export default generateHash
