import React, { useState, useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import ScaleIn from 'material-ui/internal/ScaleIn'
// import './Attention4.scss'

const Ripple2 = () => {
  const delay = Math.random() * 2
  const rotationStart = Math.random() * 360
  const rotationEnd = Math.random() * 360

  const rotation = useMotionValue(rotationStart)
  const transform = useTransform(
    rotation,
    [0, 360],
    [`scale(1.4) rotate(0deg)`, `scale(1.4) rotate(360deg)`]
  )

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

  return (
    <>
      <div
        style={{
          height: '10rem',
          width: '10rem',
          padding: '8px',
          position: 'relative'
          //   overflow: 'hidden'
        }}
      >
        <motion.div
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
        </motion.div>

        <motion.div
          animate={{
            opacity: [1, 0],
            scale: [1, 1.15]
          }}
          transition={{
            type: 'linear',
            duration: 0.5,
            repeat: Infinity
          }}
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
        </motion.div>
        <div
          className="videoContainer"
          style={{
            height: '100%',
            width: '100%',
            background: 'white',
            borderRadius: '15px',
            position: 'relative',
            zIndex: '1000'
          }}
        />
      </div>
    </>
  )
}

export default Ripple2
