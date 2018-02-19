import React, { Component } from 'react'

import Cell from './Cell'

import './Board.css'

class Board extends Component {
  render () {
    const { cells, toggleAlive, size } = this.props
    return (
      <table className={`${size}`}>
        <tbody>
        {cells.map((row,r) =>
          <tr key={r}>
          {row.map(({ id, alive, row, col }) =>
            <Cell
              key={id}
              alive={alive}
              row={row}
              col={col}
              toggleAlive={toggleAlive}
              size={size}
              />
            )}
          </tr>
        )}
        </tbody>
      </table>
    )
  }
}

export default Board
