import React from 'react'
import './header.css'

const Header = () => {
  return (
    <div className='header'>
    <div className='headerTitles'>
      <span className='headerTitleSm'>Mern Stack</span>
      <span className='headerTitleLg'>BLOG</span>
    </div>
    <img
      className='headerImg'
      src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      alt=''
    />
  </div>
  )
}

export default Header