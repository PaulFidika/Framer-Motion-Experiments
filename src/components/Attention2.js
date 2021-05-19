import React from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

const Attention2 = () => {
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
          id="gradient3"
          animate={{
            x1: [0, 0.8],
            y1: [0, 1],
            x2: [1, 0.2],
            y2: [1, 0]
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'linear',
            duration: 2
          }}
        >
          <stop offset={0} stopColor="hsl(328, 100%, 50%, 100%)" />
          <stop offset={0.3} stopColor="hsl(328, 100%, 50%, 0%)" />
        </motion.linearGradient>
      </defs>

      <rect
        width={150}
        height={150}
        rx={20}
        ry={20}
        fill="#fff"
        stroke="url(#gradient3)"
        strokeWidth="12"
        style={{ x: 100, y: -50 }}
      />
      <rect width={150} height={150} rx={20} ry={20} fill="#fff" style={{ x: 100, y: -50 }} />
    </svg>
  )
}

export default Attention2
