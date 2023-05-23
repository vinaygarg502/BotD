import { detectors } from './detectors'
import { sources } from './sources'
import shortAbbrevations from './utils/abbrMap'
import generateHash from './utils/sha'
import {
  BotdError,
  BotDetectionResult,
  BotDetectorInterface,
  BotKind,
  Component,
  ComponentDict,
  DetectionDict,
  State,
} from './types'

/**
 * Class representing a bot detector.
 *
 * @class
 * @implements {BotDetectorInterface}
 */
export default class BotDetector implements BotDetectorInterface {
  protected components: ComponentDict | undefined = undefined

  protected detections: DetectionDict | undefined = undefined

  public getComponents(): ComponentDict | undefined {
    return this.components
  }

  public getDetections(): DetectionDict | undefined {
    return this.detections
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected getSources() {
    return sources
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected getDetectors() {
    return detectors
  }

  /**
   * @inheritdoc
   */
  public detect(): BotDetectionResult {
    if (this.components === undefined) {
      throw new Error("BotDetector.detect can't be called before BotDetector.collect")
    }

    const components = this.components
    const detectors = this.getDetectors()

    const detections = {} as DetectionDict
    let finalDetection: BotDetectionResult = {
      bot: false,
    }

    for (const detectorName in detectors) {
      const detector = detectors[detectorName as keyof typeof detectors]
      const detectorRes = detector(components)

      let detection: BotDetectionResult = { bot: false }

      if (typeof detectorRes === 'string') {
        detection = { bot: true, botKind: detectorRes }
      } else if (detectorRes) {
        detection = { bot: true, botKind: BotKind.Unknown }
      }

      detections[detectorName as keyof typeof detectors] = detection

      if (detection.bot) {
        finalDetection = detection
      }
    }

    this.detections = detections

    return finalDetection
  }

  /**
   * @inheritdoc
   */
  public async collect(): Promise<ComponentDict> {
    const sources = this.getSources()
    const components = {} as ComponentDict
    const encryptedHash: any = {}

    const sourcesKeys = Object.keys(sources) as (keyof typeof sources)[]

    await Promise.all(
      sourcesKeys.map(async (sourceKey) => {
        const res = sources[sourceKey]
        console.log(shortAbbrevations)
        const encryptedKey: any = Promise.resolve(shortAbbrevations[sourceKey]).then((key) => key)
        console.log(encryptedKey)
        try {
          const result = await res()
          components[sourceKey] = {
            value: result,
            state: State.Success,
          } as Component<any> as any

          encryptedHash[encryptedKey] = result
        } catch (error) {
          if (error instanceof BotdError) {
            const detailedErrorMsg = `${error.name}: ${error.message}`
            components[sourceKey] = {
              state: error.state,
              error: detailedErrorMsg,
            }
            encryptedHash[encryptedKey] = detailedErrorMsg
          } else {
            const detailedErrorMsg = error instanceof Error ? `${error.name}: ${error.message}` : String(error)
            components[sourceKey] = {
              state: State.UnexpectedBehaviour,
              error: detailedErrorMsg,
            }
            encryptedHash[encryptedKey] = detailedErrorMsg
          }
        }
      }),
    )

    this.components = components
    return encryptedHash
  }
  public async createHash(keys = 'abcdef') {
    const keysHash: any = { ab: 'hello', cd: 'bye', ef: 'later' }
    const keysMap: any = keys.match(/.{1,2}/g)
    const data = await Promise.all(keysMap?.map((key: any) => generateHash(keysHash[key])))
    console.log(data)
  }
}
