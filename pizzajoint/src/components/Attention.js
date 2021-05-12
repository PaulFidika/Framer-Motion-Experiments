import React from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

const Attention = () => {
  //   const angle = useMotionValue(0)
  //   const gradientTransform = useTransform(angle, [0, 90], ['rotate(0)', 'rotate(90)'])

  //   React.useEffect(() => {
  //     const controls = animate(angle, 90, {
  //       type: 'spring',
  //       stiffness: 40
  //     })
  //     return controls.stop
  //   }, [angle])

  return (
    <svg width={150} height={150} overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <motion.linearGradient
          id="gradient2"
          animate={{
            x1: [0, 0.8],
            y1: [0, 1],
            x2: [1, 0.2],
            y2: [1, 0]
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            duration: 2
          }}
        >
          <stop offset={0} stopColor="hsl(204, 100%, 50%)" />
          <stop offset={1} stopColor="hsl(328, 100%, 50%)" />
        </motion.linearGradient>
      </defs>

      <rect
        width={150}
        height={150}
        rx={20}
        ry={20}
        fill="#fff"
        stroke="url(#gradient2)"
        strokeWidth="10px"
        style={{ x: 50, y: -50 }}
      />
    </svg>
  )
}

export default Attention
