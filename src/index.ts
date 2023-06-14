import BotDetector from './detector'
import { sources, WindowSizePayload, ProcessPayload } from './sources'
import { BotdError, BotDetectorInterface, BotKind, BotDetectionResult } from './types'

export async function load(): Promise<BotDetectorInterface> {
  const detector = new BotDetector()
  return detector
}

export default { load }

export { sources, BotdError, WindowSizePayload, ProcessPayload, BotDetectionResult, BotKind }
