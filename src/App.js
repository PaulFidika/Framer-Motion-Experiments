import React, { useState } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Base from './components/Base'
import Toppings from './components/Toppings'
import Order from './components/Order'
import Modal from './components/Modal'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import Layout from './components/AnimateLayout'
import Frame from './components/FrameAndBox'
import Attention from './components/Attention'
import Attention2 from './components/Attention2'
import Attention3 from './components/Attention3'
import Attention4 from './components/Attention4'
import Attention5 from './components/Attention5'
import Attention6 from './components/Attention6'
import Grid from '@material-ui/core/Grid'
import Ripple3 from './components/Ripple3'
import Ripple4 from './components/Ripple4'
import Ripple2 from './components/Ripple2'

function App() {
  const location = useLocation()
  const [pizza, setPizza] = useState({ base: '', toppings: [] })
  const [showModal, setShowModal] = useState(false)

  const addBase = base => {
    setPizza({ ...pizza, base })
  }

  const addTopping = topping => {
    let newToppings
    if (!pizza.toppings.includes(topping)) {
      newToppings = [...pizza.toppings, topping]
    } else {
      newToppings = pizza.toppings.filter(item => item !== topping)
    }
    setPizza({ ...pizza, toppings: newToppings })
  }

  return (
    <>
      {/* <Header />
      <Modal showModal={showModal} /> */}
      <AnimateSharedLayout>
        <AnimatePresence exitBeforeEnter onExitComplete={() => setShowModal(false)}>
          {/* <Attention />
        <Attention2 />
        <Grid container>
          {[...Array(1).keys()].map(i => {
            return (
              <Grid item key={i}>
                <Attention4 />{' '}
              </Grid>
            )
          })}
        </Grid> */}
          <Grid container justify="center" spacing={5}>
            {[...Array(3).keys()].map(i => {
              return (
                <Grid item key={i}>
                  <Ripple4 id={i} />
                </Grid>
              )
            })}
          </Grid>

          {/* <Layout /> */}
          {/* <Frame /> */}
          <Switch location={location} key={location.key}>
            <Route path="/base">
              <Base addBase={addBase} pizza={pizza} />
            </Route>
            <Route path="/toppings">
              <Toppings addTopping={addTopping} pizza={pizza} />
            </Route>
            <Route path="/order">
              <Order pizza={pizza} setShowModal={setShowModal} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </AnimatePresence>
      </AnimateSharedLayout>
    </>
  )
}

export default App

// Attention3 (with react refresh gradientTransform rotate) 50x participants
// (out of 15,000ms)
// 11,199ms scripting
// 159ms rendering
// 158ms painting

// Attention2 (animating x1, y1)
// (out of 15,000ms)
// 4,895ms scripting
// 495ms rendering
// 485ms painting

// total: 5,875 VS 11,516, so it's 2x more efficientn if we DON'T use react state re-renders

// Attention4 (animating css grid rotation)
// (out of 15,000ms)
// 1,954ms scripting
// 1,501ms rendering
// 718ms painting

// 4,100ms VS 5,800ms
// 4,700ms vs 5,800ms second try

// Attention5 (animating svg paths)
// 3,319ms scripting
// 1,833ms rendering
// 845ms painting
// 5,997ms total

// Attention4 is the most computationally efficient at 50 boxes
// 2,196ms (with just 4 of the boxes running)

//Ripple test (just 1 box)
// 945ms scripting
// 495ms rendering
// 300ms painting

//Ripple test (50 boxes, with ripple)
// 5,361ms scripting
// 6,279ms rendering
// 1,240ms painting
// 1,489ms system
// 12,880 ms total

//Ripple test (50 boxes, no ripple)
// 3,494ms scripting
// 3,645ms rendering
// 1,014 painting
// 1,340ms system
// 8,153ms total

// adding that little ripple effect increases computation by 50%

// 50x div ripples
// 3,252ms scripting
// 2,106ms rendering
// 784ms painting
// 783ms system

// 50x svg ripples
// 3,481ms scripting
// 2,600ms rendering
// 560ms painting
// 532ms system

// total: 6,925ms VS 7,173ms
// SVG VS Div ripples: they are roughly even

// ripples with scaling:
// 1,500ms scripting
// 2,112ms rendering
// 671 ms painting
// 748ms system
// total: 5,031ms total, which is surprisingly low
