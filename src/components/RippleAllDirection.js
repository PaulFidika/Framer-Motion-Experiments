import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import ScaleIn from 'material-ui/internal/ScaleIn'
import { AutoComplete } from 'material-ui'

const RippleAllDirection = ({ children, id }) => {
  const delay = Math.random() * 10
  const rotationStart = Math.random() * 0
  const rotationEnd = Math.random() * 0

  const rotateAttention = useMotionValue(rotationStart)
  const rotateAttentionTransform = useTransform(
    rotateAttention,
    [0, 360],
    [`scale(1.4) rotate(0deg)`, `scale(1.4) rotate(360deg)`]
  )

  useEffect(() => {
    const controls = animate(rotateAttention, rotationEnd, {
      type: 'spring',
      stiffness: 60,
      //   duration: 1,
      repeat: Infinity,
      repeatType: 'mirror',
      repeatDelay: delay
    })

    return controls.stop
  }, [])

  const attentionScale = useMotionValue(1)
  const attentionScaleTransform = useTransform(
    attentionScale,
    [1, 1.05],
    [
      'linear-gradient(rgba(100, 150, 255, 1) 70%, rgba(100, 250, 255, 1) 95%',
      'linear-gradient(rgba(100, 150, 255, 1) 5%, rgba(100, 250, 255, 1) 30%'
    ]
    // [
    //   'radial-gradient(rgba(100, 250, 255, 1) 0%, rgba(100, 150, 255, 1) 45%)',
    //   'radial-gradient(rgba(100, 250, 255, 1) 50%, rgba(100, 150, 255, 1) 60%)'
    // ]
  )

  useEffect(() => {
    const controls = animate(
      attentionScale,
      [0.92, 1.05, 1.02, 1.05, 1.01, 1.03, 1.05, 1.01, 1.02, 1, 0.92],
      {
        type: 'linear',
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 2
      }
    )

    return controls.stop
  }, [])

  const rippleScale = useMotionValue(1)
  const rippleOpacity = useTransform(rippleScale, [1, 2], [0.5, 0])
  const rippleBorderRadius = useTransform(rippleScale, [1, 2], ['16%', '35%'])

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

  // const scaleOverall = useMotionValue(150)

  // useEffect(() => {
  //   const controls = animate(scaleOverall, 300, {
  //     type: 'easeInOut',
  //     duration: 1,
  //     repeat: Infinity,
  //     repeatType: 'mirror',
  //     repeatDelay: 3
  //   })

  //   return controls.stop
  // }, [])

  return (
    <motion.div
      layout
      layoutId={id}
      style={{
        height: 150,
        width: 150,
        // height: scaleOverall,
        // width: scaleOverall,
        padding: '6px',
        position: 'relative',
        margin: '8px',
        overflow: 'visible'
      }}
    >
      <motion.div
        id="boxRipple"
        style={{
          height: '100%',
          width: '100%',
          marginBottom: 'auto',
          position: 'absolute',
          left: '0px',
          top: '0px',
          right: '0px',
          bottom: '0px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 'auto',
          border: '2px rgba(100, 150, 255, 1) solid',
          zIndex: '-1',
          opacity: rippleOpacity,
          scale: rippleScale,
          borderRadius: rippleBorderRadius
          // background: 'rgba(0,40,40,1)'
        }}
      />
      <motion.div
        id="attentionCircleBoxMask"
        style={{
          // scale: attentionScale,
          height: '100%',
          width: '100%',
          left: '0',
          top: '0',
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
            background: attentionScaleTransform,
            transform: rotateAttentionTransform
          }}
        />
      </motion.div>
      <div
        id="videoContainer"
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          borderRadius: '13%',
          background: 'grey'
        }}
      />
    </motion.div>
  )
}

export default RippleAllDirection
