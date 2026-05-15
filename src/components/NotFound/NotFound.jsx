import React, { useEffect, useState } from 'react'
import notfoundimg from '../../assets/images/error.svg'
export default function NotFound() {
  return (
    <>
      <div className="container mx-auto">
        <img src={notfoundimg} className='w-full' alt="" />
      </div>
    </>
  )
}
