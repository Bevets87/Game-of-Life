import React, { Component } from 'react'

import './Counter.css'

class Counter extends Component {
  render () {
    let { generation } = this.props
    return (
      <h1 id="counter">{`generation ${generation}`}</h1>
    )
  }
}

export default Counter
