declare let window: any
const getSpeechRecognition = (): object => {
  const localStorage = window.localStorage
  return localStorage.getItem('SPEECH_RECOGNITION_ENABLED') || false
}

export default getSpeechRecognition
