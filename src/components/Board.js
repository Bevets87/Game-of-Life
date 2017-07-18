import React, { Component } from 'react'

import './Board.css'

class Board extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (e) {
    // eslint-disable-next-line
    switch (e.target.className) {
    case 'dead':
      this.props.bringCellToLife(e.target.id)
      break;
    case 'alive':
      this.props.killCell(e.target.id)
      break;
    }
  }
  render () {

    return (
      <div className='board container'>
        {this.props.cells.map(function(cell,i){
          var styles = {}
            styles.width = cell.width + 'px'
            styles.height = cell.height + 'px'
            return (
          <div key={i} className={cell.state} style={styles} id={i} onClick={this.handleClick}></div>
          )
        }.bind(this))}
      </div>
    )
  }
}

export default Board
