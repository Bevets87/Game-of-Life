import React, { Component } from 'react'

import './Cell.css'

class Cell extends Component {
  handleClick = e => {
    e.preventDefault()
    this.props.toggleAlive({ ...this.props})
  }
  render () {
    const { alive } = this.props
    return (
      <td className={`${alive ? 'alive' : 'dead'}`} onClick={this.handleClick}></td>
    )
  }
}

export default Cell
