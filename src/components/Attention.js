import React from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
// import './Attention4.scss'

const Attention = () => {
  const angle = useMotionValue(0)
  const gradientTransform = useTransform(angle, [0, 360], ['rotate(0)', 'rotate(360)'])

  React.useEffect(() => {
    angle.set(180)
    // const controls = animate(angle, 90, {
    //   type: 'spring',
    //   stiffness: 40
    // })
    // return controls.stop
  }, [])

  return (
    <>
      <svg width={150} height={150} overflow="visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <motion.linearGradient
            id="gradient2"
            animate={{
              x1: [0, 0],
              y1: [0, 1],
              x2: [1, 1],
              y2: [1, 0]
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'linear',
              duration: 2
            }}
            gradientTransform={gradientTransform}
          >
            <stop offset={0.1} stopColor="hsl(190, 90%, 90%)" />
            <stop offset={0.3} stopColor="hsl(220, 80%, 50%)" />
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
    </>
  )
}

export default Attention
