import React from 'react'
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import './homepage.css'
import Posts from '../../components/posts/Posts'


const Homepage = () => {
  return (
    <>
    <Header />
    <div className='home'>
      <Posts/>
      <Sidebar/>

    </div>
  </>
  )
}

export default Homepage