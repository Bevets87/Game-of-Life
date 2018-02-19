import React, { Component } from 'react'

class SpeedSelection extends Component {
  handleOnChange = e => {
    e.preventDefault()
    this.props.changeSpeed(e.target.value)
  }
  render () {
    let { speed } = this.props
    return (
      <label>
        <select className="control" onChange={this.handleOnChange} value={speed}>
          <option value="slow">slow</option>
          <option value="fast">fast</option>
        </select>
        <span>speed</span>
      </label>
    )
  }
}

export default SpeedSelection
