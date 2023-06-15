import { detectors } from './detectors'
import { sources } from './sources'
import { fingerprint } from './utils/getFpId'
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

  protected abbrevetedHash: any = undefined

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

  protected getFpId() {
    return fingerprint.uid
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
    const abbrevetedHash: any = {}

    const sourcesKeys = Object.keys(sources) as (keyof typeof sources)[]

    await Promise.all(
      sourcesKeys.map(async (sourceKey) => {
        const res = sources[sourceKey]
        const encryptedKey: any = shortAbbrevations[sourceKey]
        try {
          const result = await res()
          components[sourceKey] = {
            value: result,
            state: State.Success,
          } as Component<any> as any

          abbrevetedHash[encryptedKey] = JSON.stringify(result)
        } catch (error) {
          if (error instanceof BotdError) {
            const detailedErrorMsg = `${error.name}: ${error.message}`
            components[sourceKey] = {
              state: error.state,
              error: detailedErrorMsg,
            }
            abbrevetedHash[encryptedKey] = JSON.stringify(detailedErrorMsg)
          } else {
            const detailedErrorMsg = error instanceof Error ? `${error.name}: ${error.message}` : String(error)
            components[sourceKey] = {
              state: State.UnexpectedBehaviour,
              error: detailedErrorMsg,
            }
            abbrevetedHash[encryptedKey] = JSON.stringify(detailedErrorMsg)
          }
        }
      }),
    )
    abbrevetedHash.uid = this.getFpId()

    this.components = components
    this.abbrevetedHash = abbrevetedHash
    return abbrevetedHash
  }
  public async createHash(hashMap, response, secretKey): Promise<any> {
    const [fingerPrintHashMap, serverHashMap] = response
    const fpKeys = Object.keys(fingerPrintHashMap)[0]
    let fpKeysValue = ''
    const keysMap: any = fpKeys.match(/.{1,2}/g)
    keysMap?.forEach((key: any) => (fpKeysValue = fpKeysValue + hashMap[key]))
    for (const key in serverHashMap) {
      fpKeysValue += serverHashMap[key]
    }
    const data = await generateHash(secretKey, fpKeysValue)
    return data
    // const keysMap: any = keys.match(/.{1,2}/g)
    // keysMap?.forEach((key: any) => (fpKeysValue = fpKeysValue + hashMap[key]))
  }
}
