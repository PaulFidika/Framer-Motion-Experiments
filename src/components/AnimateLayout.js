import React, { useState } from 'react'
import { motion, AnimateSharedLayout, AnimatePresence, AnimateLayoutFeature } from 'framer-motion'
import Grid from '@material-ui/core/Grid'
import Person from './Person'

const Layout = () => {
  const [list, setList] = useState([
    { name: 'Sheila', column: 0 },
    { name: 'Johnny', column: 1 },
    { name: 'Jeremy', column: 2 },
    { name: 'Dustin', column: 0 },
    { name: 'Bobby', column: 1 }
  ])

  const callback = latest => {
    console.log(latest)
  }

  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '800px'
          }}
        >
          <Grid
            style={{
              display: 'grid',
              gridTemplateAreas: '0 1 2',
              gridTemplateColumns: '[0] 1fr [1] 1fr [2] 1fr', //'repeat(3, 1fr)',
              gridTemplateRows: 'auto',
              gridGap: '20px',
              alignItems: 'start',
              gridAutoFlow: 'column'
            }}
          >
            {list.map((person, i) => (
              <Person name={person.name} column={person.column} callback={callback} />
            ))}
          </Grid>
          <motion.button
            onClick={() => {
              list[0].column = (list[0].column + 1) % 3
              setList([...list])

              const timer = setTimeout(() => {
                list[1].column = (list[1].column + 1) % 3
                setList([...list])
              }, 500)
            }}
          >
            Button
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </AnimateSharedLayout>
  )
}

export default Layout

// onLayoutUpdate (for a component)
// notifyLayoutUpdate
// onLayoutAnimationComplete
