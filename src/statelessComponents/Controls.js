import React, { Component } from 'react'

import SizeSelection from './SizeSelection'
import SpeedSelection from './SpeedSelection'

import './Controls.css'

class Controls extends Component {
  render () {
    const { changeSpeed, changeSize, size, speed, shuffle, play, pause, clear } = this.props
    const buttons = [
      { label: 'play', handler: play },
      { label: 'pause', handler: pause },
      { label: 'stop', handler: clear },
      { label: 'random', handler: shuffle },
    ]
    return (
      <div className="container">
        <div className="row no-gutters">
          {buttons.map(({ label, handler }, index) =>
          <div key={index} className={`col-3 col-sm-2 col-md-1 ${index === 0 ? 'offset-md-2' : ''}`}>
            <button onClick={handler}>
              <i className={`fas fa-${label}`}></i>
            </button>
          </div>
          )}
          <div className="col-6 col-sm-2 col-md-2">
            <SizeSelection changeSize={changeSize} size={size} shuffle={shuffle}/>
          </div>
          <div className="col-6 col-sm-2 col-md-2">
            <SpeedSelection changeSpeed={changeSpeed} speed={speed}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Controls
