import generateHash from './sha'

const hashResult = async (key: any) => {
  const data = await generateHash(key).then((hex) => hex)
  return data
}
const hashfullfiledData = (key: any) => {
  return hashResult(key).then((value) => {
    console.log(value)
    return value
  })
}
const shortAbbrevations = {
  userAgent: hashfullfiledData('ua'),
  appVersion: hashfullfiledData('av'),
  rtt: hashfullfiledData('gr'),
  windowSize: hashfullfiledData('ws'),
  pluginsLength: hashfullfiledData('pl'),
  pluginsArray: hashfullfiledData('pa'),
  errorTrace: hashfullfiledData('et'),
  productSub: hashfullfiledData('ps'),
  windowExternal: hashfullfiledData('we'),
  mimeTypesConsistent: hashfullfiledData('mm'),
  evalLength: hashfullfiledData('ev'),
  webGL: hashfullfiledData('wg'),
  webDriver: hashfullfiledData('wd'),
  languages: hashfullfiledData('lg'),
  notificationPermissions: hashfullfiledData('np'),
  documentElementKeys: hashfullfiledData('ek'),
  functionBind: hashfullfiledData('fb'),
  process: hashfullfiledData('gp'),
  distinctiveProps: hashfullfiledData('dp'),
  batteryInstance: hashfullfiledData('bi'),
  isLocalStorage: hashfullfiledData('ls'),
  isSessionStorage: hashfullfiledData('is'),
}
console.log(shortAbbrevations)

export default shortAbbrevations
