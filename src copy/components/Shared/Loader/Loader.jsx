import React, { useEffect, useState } from 'react'
import cart1 from "../../../assets/images/output-onlinegiftools.gif"
// import cart2 from "freshcart\src\assets\images\output-onlinegiftools.gif"
export default function Loader() {
  return (
    <>
    <div className='flex items-center justify-center'>
    <img src={cart1} className='w-[500px]' alt="" />

    </div>

    </>
  )
}
