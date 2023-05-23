import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectLocalSorage({ isLocalStorage }: ComponentDict): DetectorResponse {
  if (isLocalStorage.state !== State.Success) return false
  if (typeof isLocalStorage.value !== 'object') return BotKind.Unknown
}
