import React, { Component } from 'react'

import WithCells from './../higherOrderComponents/WithCells'
import WithController from './../higherOrderComponents/WithController'

import Title from './Title'
import Board from './Board'
import Controls from './Controls'
import Counter from './Counter'

const Controller = WithController(Controls)

class App extends Component {
  render () {
    const {
      cells,
      resetGeneration,
      setNextGeneration,
      randomlySetCellsAlive,
      killCells,
      toggleAlive,
      buildCells,
      size,
      generation
    } = this.props
    return (
      <div>
        <Title />
        <Counter generation={generation} />
        <Board
          cells={cells}
          toggleAlive={toggleAlive}
          size={size}
        />
        <Controller
          setNextGeneration={setNextGeneration}
          randomlySetCellsAlive={randomlySetCellsAlive}
          resetGeneration={resetGeneration}
          killCells={killCells}
          buildCells={buildCells}
          size={size}
        />
      </div>
    )
  }
}

export default WithCells(App)
