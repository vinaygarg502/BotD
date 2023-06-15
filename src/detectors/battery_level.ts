import { BotKind, ComponentDict, DetectorResponse, State } from '../types'
declare let window: any

export function detectBatteryLevel({ batteryInstance }: ComponentDict): DetectorResponse {
  if (batteryInstance.state !== State.Success) return false
  if (!(batteryInstance.value.batterInstanceResult instanceof window.BatteryManager)) return BotKind.Unknown
}
