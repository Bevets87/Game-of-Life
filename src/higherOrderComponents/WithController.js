import React, { Component } from 'react'

const WithController = WrappedComponent => {
  class Container extends Component {
    constructor (props) {
      super(props)
      this.speeds = {
        slow: 700,
        fast: 100
      }
      this.state = {
        intervalID: null,
        speed: 'fast'
      }
    }
    play = () => {
      this.setState(({ intervalID, speed }) => {
        if (!intervalID) {
          let handler = setInterval(() => {
            this.props.setNextGeneration()
          }, this.speeds[speed])
          return { intervalID: handler }
        }
      })
    }
    pause = () => {
      this.setState(({ intervalID }) => {
        clearInterval(intervalID)
        return { intervalID: false }
      })
    }
    clear = () => {
      this.setState(({ intervalID }) => {
        clearInterval(intervalID)
        return { intervalID: null }
      })
      this.props.resetGeneration()
      this.props.killCells()
    }
    shuffle = () => {
      this.setState(({ intervalID }) => {
        clearInterval(intervalID)
        return { intervalID: null }
      })
      this.props.resetGeneration()
      this.props.killCells()
      this.props.randomlySetCellsAlive()
    }
    changeSize = size => {
      this.setState(({ intervalID }) => {
        clearInterval(intervalID)
        return { intervalID: null }
      })
      this.props.resetGeneration()
      this.props.killCells()
      this.props.buildCells(size)
    }
    changeSpeed = speedType => {
      this.pause()
      this.setState(() => {
        return { speed: speedType}
      })
      this.play()

    }
    render () {
      let { speed } = this.state, { size } = this.props
      return (
        <WrappedComponent
          play={this.play}
          pause={this.pause}
          clear={this.clear}
          shuffle={this.shuffle}
          changeSize={this.changeSize}
          changeSpeed={this.changeSpeed}
          speed={speed}
          size={size}
        />
      )
    }
  }
  return Container
}

export default WithController
