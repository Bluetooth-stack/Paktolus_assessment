import React from 'react'
import './style.css'

function Snake({ snakeDots }) {
  return (
      
        snakeDots.map((dot, i) => {
          const style =
          {
            left: `${dot[0]}%`,
            top: `${dot[1]}%`
          }
          return (
            <div className="snake-dot" key={i} style={style}></div>
          )
        })
      
  )
}

export default Snake