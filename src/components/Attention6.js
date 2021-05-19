import React, { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

// This is a failed attempt to animate gradientTransform

const Attention6 = () => {
  const rotation = useMotionValue(0)
  const gradientTransform = useTransform(rotation, [0, 360], ['rotate(0)', 'rotate(360)'])

  useEffect(() => {
    const controls = animate(rotation, 180, {
      type: 'spring',
      stiffness: 60,
      repeat: Infinity,
      repeatType: 'mirror',
      repeatDelay: 1
    })

    return controls.stop
  }, [])

  return (
    <motion.svg width={150} height={150} overflow="visible">
      <motion.defs>
        <motion.linearGradient
          gradientTransform={gradientTransform}
          id="gradient7"
          x1={0}
          y1={0}
          x2={1}
          y2={1}
        >
          <stop offset={0} stopColor="hsl(328, 100%, 50%, 100%)" />
          <stop offset={0.3} stopColor="hsl(328, 100%, 50%, 0%)" />
        </motion.linearGradient>
      </motion.defs>

      <motion.rect
        width={150}
        height={150}
        rx={20}
        ry={20}
        fill="#fff"
        stroke="url(#gradient7)"
        strokeWidth="12"
        style={{ x: 100, y: -50 }}
      />
      <motion.rect
        width={150}
        height={150}
        rx={20}
        ry={20}
        fill="#fff"
        style={{ x: 100, y: -50 }}
      />
    </motion.svg>
  )
}

export default Attention6
