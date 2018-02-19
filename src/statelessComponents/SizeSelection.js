import React, { Component } from 'react'

import './SizeSelection.css'

class SizeSelection extends Component {
  handleOnChange = e => {
    e.preventDefault()
    this.props.changeSize(e.target.value)
    this.props.shuffle()
  }
  render () {
    let { size } = this.props
    return (
      <div className="input-group">
        <select id="size-selection" className="custom-select"  onChange={this.handleOnChange} value={size}>
          <option value="small">sm</option>
          <option value="medium">md</option>
          <option value="large">lg</option>
        </select>
      </div>
    )
  }
}

export default SizeSelection
