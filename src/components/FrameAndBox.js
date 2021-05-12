import React, { useEffect, useState, useCallback, useRef } from 'react'
import { animate, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const center_x = 200
const center_y = 200

function template({ rotate }) {
  return `rotate(${rotate})`
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  control: {
    padding: theme.spacing(2)
  }
}))

const Box = ({ y, ball }) => {
  const angle = useMotionValue(0)
  const box = useRef()
  const [angle2, setAngle2] = useState(0)

  useEffect(
    () =>
      y.onChange(latest => {
        const boxRect = box.current.getBoundingClientRect()
        const ballRect = ball.current.getBoundingClientRect()

        const boxCenterX = Math.round((boxRect.left + boxRect.right) / 2)
        const boxCenterY = Math.round((boxRect.top + boxRect.bottom) / 2)
        const ballCenterX = Math.round((ballRect.left + ballRect.right) / 2)
        const ballCenterY = Math.round((ballRect.top + ballRect.bottom) / 2)

        // angle.set((Math.atan2(latest - 0, 87 - 0) * 180) / Math.PI)
        angle.set((Math.atan2(ballCenterY - boxCenterY, ballCenterX - boxCenterX) * 180) / Math.PI)
        // setAngle2(
        //   Math.round(
        //     (Math.atan2(ballCenterY - boxCenterY, ballCenterX - boxCenterX) * 180) / Math.PI
        //   )
        // )
      }),
    []
  )

  return (
    <>
      {/* {`Angle: ${angle2}`} */}
      <motion.div
        //   transformTemplate={template}
        // animate={{
        //   rotate: angle.get()
        // }}
        transition={{ duration: 0.5 }}
        ref={box}
        style={{
          rotate: angle,
          width: 100,
          height: 100,
          borderRadius: 20,
          backgroundColor: '#000',
          // rotateX: rotateX,
          // rotateY: rotateY,
          // x: 'calc(50vh - 100px)',
          transformOrigin: 'center center'
        }}
      >
        {'-->'}
      </motion.div>
    </>
  )
}

const Frame = () => {
  //   const [angle, setAngle] = useState(0)

  const y = useMotionValue(0)

  const [cursorX, setCursorX] = useState(0)
  const [cursorY, setCursorY] = useState(0)

  const ball = useRef()
  const classes = useStyles()

  // const rotateX = useTransform(y, [0, 400], [45, -45])
  // const rotateY = useTransform(x, [0, 400], [-45, 45])

  // const handleMouse = useCallback(event => {
  //   const rect = event.currentTarget.getBoundingClientRect()
  //   angle.set(
  //     (Math.atan2(event.clientY - (center_y + rect.top), event.clientX - (center_x + rect.left)) *
  //       180) /
  //       Math.PI
  //   )

  //   // x.set(event.clientX - rect.left)
  //   // y.set(event.clientY - rect.top)
  //   setCursorX(event.clientX)
  //   setCursorY(event.clientY)
  // }, [])

  useEffect(() => {
    let controls
    let direction = 1

    const defineAnimate = target => {
      controls = animate(y, target, {
        type: 'spring',
        stiffness: 40,
        onComplete: v => {
          direction = direction * -1
          defineAnimate(direction * 350 - 50)
        }
      })
    }

    defineAnimate(-200)

    return controls.stop
  }, [])

  return (
    <>
      {`X: ${cursorX}`}
      {`Y: ${cursorY}`}
      {/* {`Angle: ${angle.get()}`} */}
      <Grid container className={classes.root} spacing={4}>
        {/* <motion.div
        style={{
          width: 400,
          height: 400,
          display: 'flex',
          placeItems: 'center',
          placeContent: 'center',
          borderRadius: 30,
          backgroundColor: 'rgba(255, 255, 255, 0.05)'
          //   perspective: 1000
        }}
        // onClick={handleMouse}
      > */}
        {[...Array(1).keys()].map(value => (
          <Grid key={value} item>
            <Box y={y} ball={ball} />
          </Grid>
        ))}

        {/* <motion.div
          transition={{ duration: 2 }}
          animate={{ rotate: 2 }}
          style={{
            rotate: -2,
            width: 100,
            height: 100,
            borderRadius: 20,
            backgroundColor: '#000',
            // rotateX: rotateX,
            // rotateY: rotateY,
            // x: 'calc(50vh - 100px)',
            transformOrigin: 'center center'
          }}
        >
          <div>{'<--'}</div>
        </motion.div> */}

        {/* <motion.div
          //   transformTemplate={template}
          // animate={{
          //   rotate: angle.get()
          // }}
          transition={{ duration: 0.5 }}
          ref={box}
          style={{
            rotate: angle,
            width: 100,
            height: 100,
            borderRadius: 20,
            backgroundColor: '#fff',
            // rotateX: rotateX,
            // rotateY: rotateY,
            // x: 'calc(50vh - 100px)',
            transformOrigin: 'center center'
          }}
        /> */}
        <motion.div
          transition={{ duration: 0.5 }}
          ref={ball}
          style={{
            x: -40,
            y,
            width: 25,
            height: 25,
            borderRadius: 25,
            backgroundColor: '#fff',
            transformOrigin: 'center center'
          }}
        />
        {/* </motion.div> */}
      </Grid>
    </>
  )
}
// one instance = 8.6% scripting
// 10 instance = 7.2% scripting
// 50 instance = 10.8% scripting

// one instance = 2.9% rendering
// 10 instance = 4% rendering
// 50 instance = 9.3% rendering

export default Frame
