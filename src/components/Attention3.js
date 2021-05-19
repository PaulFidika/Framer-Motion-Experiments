import React, { useState, useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

const Attention3 = () => {
  const angle = useMotionValue(-45)
  const [angleReact, setAngleReact] = useState(-45)

  useEffect(() => {
    const controls = animate(angle, 135, {
      type: 'spring',
      stiffness: 70,
      //   duration: 1,
      repeat: Infinity,
      repeatType: 'mirror',
      repeatDelay: 2
    })

    angle.onChange(latest => setAngleReact(latest))

    return controls.stop
  }, [])

  return (
    <svg width={150} height={150} overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <motion.linearGradient
          id="gradient4"
          x1={0}
          x2={1}
          y1={0}
          y2={1}
          gradientTransform={`rotate(${angleReact}, 0.5, 0.5)`}
        >
          <stop offset={0.24} stopColor="hsl(328, 100%, 50%, 100%)" />
          <stop offset={0.25} stopColor="hsl(328, 100%, 50%, 0%)" />
        </motion.linearGradient>
      </defs>

      <rect
        width={150}
        height={150}
        rx={20}
        ry={20}
        fill="#fff"
        stroke="url(#gradient4)"
        strokeWidth="14"
        style={{ x: 150, y: -50 }}
      />
      <rect width={150} height={150} rx={20} ry={20} fill="#fff" style={{ x: 150, y: -50 }} />
    </svg>
  )
}

export default Attention3
