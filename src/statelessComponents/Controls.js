import React, { Component } from 'react'

import SizeSelection from './SizeSelection'
import SpeedSelection from './SpeedSelection'

import './Controls.css'

class Controls extends Component {
  render () {
    const { changeSpeed, changeSize, size, speed, shuffle } = this.props
    const controls = [
      { label: 'play', handler: this.props.play, icon: 'play' },
      { label: 'pause', handler: this.props.pause, icon: 'pause' },
      { label: 'clear', handler: this.props.clear, icon: 'stop' },
      { label: 'shuffle', handler: this.props.shuffle, icon: 'random' }
    ]
    return (
      <section>
        <div className="top-row">
        {controls.map(({ label, handler, icon }, index) =>
          <button key={index} onClick={handler}>
            <i className={`fas fa-${icon}`}></i>
          </button>
        )}
        </div>
        <div className="bottom-row">
          <SizeSelection changeSize={changeSize} size={size} shuffle={shuffle}/>
          <SpeedSelection changeSpeed={changeSpeed} speed={speed}/>
        </div>
      </section>
    )
  }
}

export default Controls
