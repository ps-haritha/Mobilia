import React from 'react'
import AdminNavigation from './AdminNavigation'
import UserNavigation from './UserNavigation'
import Image from 'react-bootstrap/Image';
import Footer from './Footer';
import './AdminHome.css'
function AdminHome() {
    
  return (
    <>
    <div >
      <UserNavigation/>
    <img src="/image/adhome.webp"  alt="" className='homebg' />
    </div>
    </>
  )
}

export default AdminHome
