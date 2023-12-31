import React from 'react'
import Navbar from '../elements/Navbar'

const Home = (props) => {
  return (
    <>
    <Navbar/>
    {props.child}
    </>
  )
}

export default Home