import React, { useState, useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
// import './Attention4.scss'

const Attention4 = () => {
  const delay = Math.random() * 2
  const rotationStart = Math.random() * 360
  const rotationEnd = Math.random() * 360

  const rotation = useMotionValue(rotationStart)
  const transform = useTransform(
    rotation,
    [0, 360],
    [
      //   `linear-gradient(0deg, rgba(0,0,0,0) , rgba(100, 150, 255, 1))`,
      //   `linear-gradient(360deg, rgba(0,0,0,0) , rgba(100, 150, 255, 1))`
      `scale(1.4) rotate(0deg)`,
      `scale(1.4) rotate(360deg)`
    ]
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
      <motion.div
        style={{
          //   background: background,
          height: '10rem',
          width: '10rem',
          padding: '8px',
          borderRadius: '20px',
          position: 'relative',
          overflow: 'hidden'
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
        <div
          className="videoContainer"
          style={{
            height: '100%',
            width: '100%',
            background: 'white',
            borderRadius: '15px'
          }}
        />
      </motion.div>
    </>
  )
}

export default Attention4
