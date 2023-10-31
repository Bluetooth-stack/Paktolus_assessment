import React from 'react'
import './style.css'

function Food({ foodPos }) {
  const style=
    {
        left:`${foodPos[0]}%`,
        top:`${foodPos[1]}%`
    }
  return (
    <div className='snake-food' style={style}></div>
  )
}

export default Food