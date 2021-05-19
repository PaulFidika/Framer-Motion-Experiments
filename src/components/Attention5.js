import React from 'react'
import { motion, useMotionValue } from 'framer-motion'

const Attention5 = () => {
  const pathOffset = useMotionValue(0)
  const pathLength = useMotionValue(0)
  const pathSpacing = useMotionValue(0)

  return (
    <motion.svg width={200} height={200} overflow="visible">
      <defs>
        <motion.linearGradient
          id="gradient6"
          x1={0}
          x2={1}
          y1={0}
          y2={1}
          gradientTransform={`rotate(0, 0.5, 0.5)`}
        >
          <stop offset={0} stopColor="hsl(328, 100%, 50%, 100%)" />
          <stop offset={1} stopColor="hsl(328, 100%, 50%, 100%)" />
        </motion.linearGradient>
      </defs>

      <motion.path
        d="m 100,100 h125 a20,20 0 0 1 20,20 v125 a20,20 0 0 1 -20,20 h-125 a20,20 0 0 1 -20,-20 v-125 a20,20 0 0 1 20,-20 z"
        initial={{
          pathLength: 0.25,
          pathOffset: 0.125,
          pathSpacing: 1
        }}
        animate={{
          pathLength: 0.25,
          pathOffset: 0.625,
          pathSpacing: 1
        }}
        transition={{
          type: 'easeInOut',
          duration: 1,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 1
        }}
        // style={{
        //   pathOffset,
        //   pathLength,
        //   pathSpacing
        // }}
        fill="#fff"
        strokeWidth="7"
        stroke="url(#gradient6)"
        // variants={boxVariants}
      />
    </motion.svg>
  )
}

export default Attention5
