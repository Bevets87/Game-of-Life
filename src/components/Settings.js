import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

import './Settings.css'

class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      intervalId : 'stopped'
    }
    this.play= this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.clear = this.clear.bind(this)
    this.shuffle = this.shuffle.bind(this)
  }
  play () {
    var intervalId = this.state.intervalId
    if (intervalId === 'stopped') {
      intervalId = setInterval(function () {
      this.props.updateStateOfCells(this.props.getNeighborCellsPositions);
      }.bind(this),100)
      this.setState({
        intervalId: intervalId
      })
    }
  }
  pause () {
    clearInterval(this.state.intervalId)
    this.setState({
      intervalId: 'stopped'
    })
  }
  clear () {
    clearInterval(this.state.intervalId)
    this.props.resetStateOfCells()
    this.setState({
      intervalId: 'stopped'
    })
  }
  shuffle () {
    clearInterval(this.state.intervalId)
    this.props.randomizeStateOfCells()
    this.setState({
      intervalId: 'stopped'
    })
  }
  render () {
    return (
      <div className='settings-container'>
        <RaisedButton
          onTouchTap={this.play}
          label='play'
          icon={<FontIcon className='material-icons'>play_arrow</FontIcon>}>
        </RaisedButton>
        <RaisedButton
          onTouchTap={this.pause}
          label='pause'
          icon={<FontIcon className='material-icons'>pause_circle_filled</FontIcon>}>
        </RaisedButton>
        <RaisedButton
          onTouchTap={this.clear}
          label='clear'
          icon={<FontIcon className='material-icons'>clear</FontIcon>}>
        </RaisedButton>
        <RaisedButton
          onTouchTap={this.shuffle}
          label='shuffle'
          icon={<FontIcon className='material-icons'>shuffle</FontIcon>}>
        </RaisedButton>
      </div>
    )
  }
}
export default Settings
