import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import ScaleIn from 'material-ui/internal/ScaleIn'
import { AutoComplete } from 'material-ui'
// import './Attention4.scss'

// const BackgroundRipple = ({ children }) => {
//   const rippleScale = useMotionValue(1)
//   const opacity = useTransform(rippleScale, [1, 5], [0.5, 0])

//   useEffect(() => {
//     const controls = animate(rippleScale, 5, {
//       type: 'easeOut',
//       duration: 6,
//       repeat: Infinity,
//       repeatType: 'loop',
//       repeatDelay: 1
//     })

//     return controls.stop
//   }, [])

//   return ReactDOM.createPortal(
//     <motion.svg
//       style={{
//         overflow: 'visible',
//         position: 'absolute'
//       }}
//     >
//       <motion.rect
//         id="boxRipple"
//         width={150}
//         height={150}
//         rx={'7%'}
//         fill="transparent"
//         stroke="rgba(100, 150, 255, 1)"
//         strokeWidth="2"
//         style={{ scale: rippleScale, opacity: opacity }}
//       />
//     </motion.svg>,
//     document.getElementById('background')
//   )
// }

const Ripple3 = () => {
  const delay = Math.random() * 10
  const rotationStart = Math.random() * 360
  const rotationEnd = Math.random() * 360

  const rotation = useMotionValue(rotationStart)
  const transform = useTransform(
    rotation,
    [0, 360],
    [`scale(1.4) rotate(0deg)`, `scale(1.4) rotate(360deg)`]
  )

  const scale = useMotionValue(1)
  const transformScale = useTransform(
    scale,
    [1.05, 1.07],
    [
      'linear-gradient(rgba(100, 150, 255,0) 70%, rgba(100, 150, 255, 1) 80%, rgba(100, 250, 255, 1) 85%',
      'linear-gradient(rgba(100, 150, 255,0) 40%, rgba(100, 150, 255, 1) 70%, rgba(100, 250, 255, 1) 80%'
    ]
  )

  const rippleScale = useMotionValue(1)
  const opacity = useTransform(rippleScale, [1, 2], [0.5, 0])

  useEffect(() => {
    const controls = animate(rotation, rotationEnd, {
      type: 'spring',
      stiffness: 60,
      //   duration: 1,
      repeat: Infinity,
      repeatType: 'mirror',
      repeatDelay: delay
    })

    return controls.stop
  }, [])

  useEffect(() => {
    const controls = animate(scale, [1.05, 1.055, 1.07, 1.06, 1.07, 1.05], {
      type: 'linear',
      duration: 0.7,
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 0.2
    })

    return controls.stop
  }, [])

  useEffect(() => {
    const controls = animate(rippleScale, 2, {
      type: 'easeOut',
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 1
    })

    return controls.stop
  }, [])

  const scaleOverall = useMotionValue(1)

  useEffect(() => {
    const controls = animate(scaleOverall, 2, {
      type: 'easeOut',
      duration: 2,
      repeat: Infinity,
      repeatType: 'mirror',
      repeatDelay: 1
    })

    return controls.stop
  }, [])

  return (
    <motion.div
      style={{
        scale: scaleOverall,
        height: '150px',
        width: '150px',
        position: 'relative',
        margin: '16px',
        overflow: 'visible'
      }}
    >
      <motion.svg
        style={{
          overflow: 'visible',
          position: 'absolute'
        }}
      >
        <motion.rect
          id="boxRipple"
          width={150}
          height={150}
          rx={'13%'}
          fill="transparent"
          stroke="rgba(100, 150, 255, 1)"
          strokeWidth="2"
          style={{ scale: rippleScale, opacity: opacity }}
        />
      </motion.svg>
      <motion.div
        id="attentionCircleBoxMask"
        style={{
          // scale: scale,
          height: 'calc(100% + 0px)',
          width: 'calc(100% + 0px)',
          // transform: 'scale(1.1)',
          border: '10px',
          overflow: 'hidden',
          position: 'absolute',
          borderRadius: '13%'
        }}
      >
        <motion.div
          id="attentionCircle"
          style={{
            height: '100%',
            width: '100%',
            left: '0',
            top: '0',
            position: 'absolute',
            borderRadius: '50%',
            background: transformScale,
            transform: transform
          }}
        />
      </motion.div>
      <div
        id="videoContainer"
        style={{
          height: '150px',
          width: '150px',
          position: 'absolute',
          borderRadius: '13%',
          background: 'grey'
        }}
      />
    </motion.div>
  )
}

export default Ripple3
