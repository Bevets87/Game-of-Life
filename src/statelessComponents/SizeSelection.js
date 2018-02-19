import React, { Component } from 'react'

class SizeSelection extends Component {
  handleOnChange = e => {
    e.preventDefault()
    this.props.changeSize(e.target.value)
    this.props.shuffle()
  }
  render () {
    let { size } = this.props
    return (
      <label><span>size</span>
        <select className="control" onChange={this.handleOnChange} value={size}>
          <option value="small">sm</option>
          <option value="medium">md</option>
          <option value="large">lg</option>
        </select>
      </label>
    )
  }
}

export default SizeSelection
