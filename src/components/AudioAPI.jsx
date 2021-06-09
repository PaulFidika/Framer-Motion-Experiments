import AvVolumeDown from 'material-ui/svg-icons/av/volume-down'
import React, { useRef, useEffect } from 'react'

const msRecord = 5000
const numberOfBars = 150

const context = new (window.AudioContext || window.webkitAudioContext)()
const analyserNode = new AnalyserNode(context, { fftSize: 256, smoothingTimeConstant: 0.4 })
const gainNode = context.createGain()
const bassEQ = new BiquadFilterNode(context, {
  type: 'lowshelf',
  frequency: 500,
  gain: 0
})
const midEQ = new BiquadFilterNode(context, {
  type: 'peaking',
  Q: Math.SQRT1_2,
  frequency: 1500,
  gain: 0
})
const trebleEQ = new BiquadFilterNode(context, {
  type: 'highshelf',
  frequency: 3000,
  gain: -10
})
const delayNode = new DelayNode(context, { delayTime: msRecord / 1000, maxDelayTime: 10 })

const setupContext = async () => {
  const mediaStream = await getUserMedia()
  if (context.state === 'suspended') {
    await context.resume()
  }
  const mediaStreamAudioSourceNode = context.createMediaStreamSource(mediaStream)
  // mediaStreamAudioSourceNode.connect(context.destination)
  // mediaStreamAudioSourceNode.connect(analyserNode)

  mediaStreamAudioSourceNode.connect(bassEQ)
  bassEQ.connect(midEQ)
  midEQ.connect(trebleEQ)
  trebleEQ.connect(gainNode)
  gainNode.connect(delayNode)
  delayNode.connect(context.destination)

  gainNode.connect(analyserNode)
}

const getUserMedia = () => {
  return navigator.mediaDevices.getUserMedia({
    audio: true
    // {
    //   echoCancellation: true,
    //   autoGainControl: true,
    //   noiseSuppression: true,
    //   latency: 0
    // }
  })
}

const Visualizer = () => {
  const canvasRef = useRef()

  const toggleMute = () => {
    if (gainNode.gain.value === 0) gainNode.gain.setTargetAtTime(1, context.currentTime, 0.1)
    else gainNode.gain.setTargetAtTime(0, context.currentTime, 0.1)
  }

  useEffect(() => {
    setupContext()
    const resize = () => {
      canvasRef.current.width = canvasRef.current.clientWidth * window.devicePixelRatio
      canvasRef.current.height = canvasRef.current.clientHeight * window.devicePixelRatio
    }
    //drawVisualizer(canvasRef)
    startRecording(canvasRef)
    resize()
    // window.addEventListener('resize', resize)
    // return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <div style={{ position: 'relative', top: 0, left: 0, width: '10vw', height: '30vw' }}>
      <button onClick={toggleMute} style={{ position: 'relative' }}>
        Mute
      </button>
      <canvas
        ref={canvasRef}
        style={{ position: 'relative' }}
        // style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vw' }}
      ></canvas>
    </div>
  )
}

// const drawVisualizer = canvasRef => {
//   requestAnimationFrame(() => drawVisualizer(canvasRef))

//   const bufferLength = analyserNode.frequencyBinCount
//   const dataArray = new Uint8Array(bufferLength)
//   analyserNode.getByteFrequencyData(dataArray)
//   const width = canvasRef.current.width
//   const height = canvasRef.current.height
//   const barWidth = width / bufferLength

//   const canvasContext = canvasRef.current.getContext('2d')
//   canvasContext.clearRect(0, 0, width, height)

//   dataArray.forEach((item, index) => {
//     const y = ((item / 255) * height) / 2
//     const x = barWidth * index

//     canvasContext.fillStyle = `hsl(${(index / bufferLength) * 360}, 100%, 50%)`
//     canvasContext.fillRect(x, height - y, barWidth, y)
//   })
// }

const barValues = new Uint8Array(numberOfBars)

// 5 seconds long times 50 frames per second = 250 frames total
const startRecording = canvasRef => {
  let index = 0
  const width = canvasRef.current.width
  const height = canvasRef.current.height
  const barWidth = width / numberOfBars
  const canvasContext = canvasRef.current.getContext('2d')

  const interval = window.setInterval(() => {
    const sampleArray = new Uint8Array(analyserNode.frequencyBinCount)
    analyserNode.getByteFrequencyData(sampleArray)
    let values = 0
    const length = sampleArray.length
    for (let i = 0; i < length; i++) {
      values += sampleArray[i]
    }
    const volume = Math.min(100, Math.max(0, Math.log10(values / length / 3) * 60))

    const y = ((volume / 45) * height) / 2
    const x = barWidth * index

    canvasContext.fillStyle = `hsl(${(index / numberOfBars) * 360}, 100%, 50%)`

    canvasContext.clearRect(x, 0, barWidth, height)
    canvasContext.fillRect(x, height - y, barWidth, y)
    canvasContext.fillRect(x + barWidth, 0, barWidth, height)
    index = (index + 1) % numberOfBars
  }, msRecord / numberOfBars)
}

export default Visualizer
