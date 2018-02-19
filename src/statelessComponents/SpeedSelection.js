import React, { Component } from 'react'

import './SpeedSelection.css'

class SpeedSelection extends Component {
  handleOnChange = e => {
    e.preventDefault()
    this.props.changeSpeed(e.target.value)
  }
  render () {
    let { speed } = this.props
    return (
      <div className="input-group">
        <select id="speed-selection" className="custom-select" onChange={this.handleOnChange} value={speed}>
          <option value="slow">slow</option>
          <option value="fast">fast</option>
        </select>
      </div>
    )
  }
}

export default SpeedSelection
