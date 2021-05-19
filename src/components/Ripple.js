import React, { useState, useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import ScaleIn from 'material-ui/internal/ScaleIn'
// import './Attention4.scss'

const Ripple = () => {
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
    [1, 1.05],
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
    const controls = animate(scale, [1, 1.02, 1.05, 1.01, 1.025, 1], {
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

  return (
    <>
      <motion.svg
        style={{
          //   scale: rippleScale,
          x: 15,
          y: 165,
          overflow: 'visible',
          transformOrigin: 'center', // <- make it centre
          transformBox: 'fill-box' // <- of the element
        }}
      >
        <motion.rect
          width={150}
          height={150}
          id="rippleBox"
          //   initial={{ opacity: 1, style: { scale: 1 } }}
          //   animate={{ opacity: 0, style: { scale: 2 } }}
          //   transition={{
          //     type: 'linear',
          //     duration: 1,
          //     repeat: Infinity,
          //     repeatType: 'loop',
          //     repeatDelay: 1
          //   }}
          rx={20}
          ry={20}
          fill="transparent"
          stroke="rgba(100, 150, 255, 1)"
          strokeWidth="2"
          style={{ scale: rippleScale, opacity: opacity }}
          //   style={{ scale: rippleScale, position: 'absolute', left: '0', top: '0', zIndex: '0' }}
          //   style={{ originX: 0.5, originY: 0.5 }}
        />
      </motion.svg>
      <div
        style={{
          height: '10rem',
          width: '10rem',
          padding: '8px',
          position: 'relative'
          //   backgroundImage: 'url(#rippleBox)'
          //   overflow: 'hidden'
        }}
      >
        {/* <motion.div
          style={{
            height: '100%',
            width: '100%',
            overflow: 'hidden',
            position: 'absolute',
            left: '0',
            top: '0',
            zIndex: '0',
            borderRadius: '20px'
            // transform: 'scale(1.3)',
            // opacity: '0.4'
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              background:
                'linear-gradient(rgba(100, 150, 255,0) 70%, rgba(100, 150, 255, 1) 80%, rgba(100, 250, 255, 1) 85%',
              left: '0',
              top: '0',
              borderRadius: '50%',
              // transform: `scale(1.4) rotate(${background})`,
              transform: transform,
              zIndex: '-1'
            }}
          />
        </motion.div> */}

        <motion.div
          //   animate={{
          //     scale: [1, 1.15]
          //   }}
          //   transition={{
          //     type: 'linear',
          //     duration: 0.3,
          //     repeat: Infinity,
          //     repeatType: 'mirror',
          //     repeatDelay: 2
          //   }}
          style={{
            scale: scale,
            height: '100%',
            width: '100%',
            overflow: 'hidden',
            position: 'absolute',
            left: '0',
            top: '0',
            zIndex: '0',
            borderRadius: '20px'
            // transform: 'scale(1.3)',
            // opacity: '0.4'
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              background: transformScale,
              left: '0',
              top: '0',
              borderRadius: '50%',
              // transform: `scale(1.4) rotate(${background})`,
              transform: transform,
              zIndex: '-1'
            }}
          />
        </motion.div>
        <div
          className="videoContainer"
          style={{
            height: '100%',
            width: '100%',
            background: 'grey',
            borderRadius: '15px',
            position: 'relative',
            zIndex: '1000'
          }}
        />
      </div>
    </>
  )
}

export default Ripple
