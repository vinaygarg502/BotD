declare let window: any
const getBatteryLevel = async () => {
  const batteryPromise = window.navigator.getBattery()
  const batterInstanceResult = await batteryPromise.then((battery: any) => battery)

  return { batterInstanceResult }
}

export default getBatteryLevel
