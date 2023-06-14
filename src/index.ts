import { version } from '../package.json'
import BotDetector from './detector'
import { sources, WindowSizePayload, ProcessPayload } from './sources'
import { BotdError, BotDetectorInterface, BotKind, BotDetectionResult } from './types'

/**
 * Options for BotD loading
 */
export interface LoadOptions {
  /**
   * Set `false` to disable the unpersonalized AJAX request that the agent sends to collect installation statistics.
   * It's always disabled in the version published to the FingerprintJS CDN.
   */
  monitoring?: boolean
}

/**
 * Sends an unpersonalized AJAX request to collect installation statistics
 */

export async function load(): Promise<BotDetectorInterface> {
  const detector = new BotDetector()
  return detector
}

export default { load }

// The exports below are for private usage. They may change unexpectedly. Use them at your own risk.
/** Not documented, out of Semantic Versioning, usage is at your own risk */
export { sources, BotdError, WindowSizePayload, ProcessPayload, BotDetectionResult, BotKind }
