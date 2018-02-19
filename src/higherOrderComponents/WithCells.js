import React, { Component } from 'react'

const WithCells = WrappedComponent => {
  class Container extends Component {
    constructor () {
      super()
      this.sizes = {
        small: { rows: 15, cols: 15 },
        medium: { rows: 20, cols: 30 },
        large: { rows: 25, cols: 45 },
      }
      this.state = {
        size: null,
        rows: null,
        cols: null,
        cells: [],
        aliveCells: [],
        generation: 0,
      }
    }
    componentWillMount = () => {
      let { width } = window.screen
      if (width < 600) { this.buildCells('small')}
      else if (width < 1200) { this.buildCells('medium') }
      else { this.buildCells('large') }
      this.randomlySetCellsAlive()
    }
    buildCells = sizeType => {
      let cells = [], count = 0, size = this.sizes[sizeType]
      for (var r = 0; r < size.rows; r++) {
        let row = [];
        for (var c = 0; c < size.cols; c++) {
          row.push({
            id: ++count,
            alive: false,
            row: r,
            col: c,
            neighborsCount: 0
          })
        }
        cells.push(row)
      }
      this.setState({ cells, size: sizeType, rows: size.rows, cols: size.cols })
    }
    randomlySetCellsAlive = () => {
      this.setState(prevState => {
        let cells, aliveCells = []
        cells = prevState.cells.map(row => row.map(cell => {
          cell.alive = Math.random() > 0.15 ? false : true;
          if (cell.alive) { aliveCells.push(cell) }
          return cell
        }))
        return { cells, aliveCells }
      })
    }
    killCells = () => {
      this.setState(prevState => {
        let cells, aliveCells = []
        cells = prevState.cells.map(row => row.map(cell => {
          cell.alive = false;
          return cell;
        }))
        return { cells, aliveCells }
      })
    }
    resetGeneration = () => {
      this.setState({ generation: 0 })
    }
    setNextGeneration = () => {
      this.setState(prevState => {
        let { aliveCells, cells, generation } = prevState, newCells
        //set neighbors count of alive cells
        for (let i = 0; i < aliveCells.length; i++) {
          this.getNeighborsPositions(aliveCells[i])
          .forEach(({ row, col }) => {
            cells[row][col].neighborsCount++
          })
        }
        //reset alive cells for next round
        aliveCells = []
        //apply conways rules to cells with a neighbors count
        newCells = cells.map(row => row.map(cell => {
          if (cell.neighborsCount) {
            cell = this.applyConwaysRules(cell)
            cell.neighborsCount = 0;
            if (cell.alive) { aliveCells.push(cell) }
          } else {
            cell.alive = false;
          }
          return cell
        }))
        return { cells: newCells, generation: ++generation, aliveCells }
      })
    }

    toggleAlive = cell => {
      let { row, col } = cell, newCells
      this.setState(prevState => {
        let { aliveCells, cells } = prevState, newAliveCells = aliveCells.slice()
        newCells = cells.map(r => r.map((c, i) => {
          if (c.row === row && c.col === col) {
            c.alive = !c.alive
            if (c.alive) { newAliveCells.push(c) }
            else { newAliveCells.splice(newAliveCells.indexOf(c), 1) }
          }
          return c
        }))
        return { cells: newCells, aliveCells: newAliveCells }
      })
    }
    getNeighborsPositions = cell => {
      let { rows, cols } = this.state, { row, col } = cell,
      modRows = rows, modCols = cols,
      modRow = modRows + row, modCol = modCols + col;

      return [
        { row: ((modRow - 1) % modRows), col },
        { row: ((modRow - 1) % modRows), col: ((modCol - 1) % modCols) },
        { row, col: ((modCol - 1) % modCols) },
        { row: ((modRow + 1) % modRows), col: ((modCol - 1) % modCols) },
        { row: ((modRow + 1) % modRows), col },
        { row: ((modRow + 1) % modRows), col: ((modCol + 1) % modCols) },
        { row, col: ((modCol + 1) % modCols) },
        { row: ((modRow - 1) % modRows), col: ((modCol + 1) % modCols) }
      ]
    }
    applyConwaysRules = cell => {
      if (cell.alive) {
        cell.alive = cell.neighborsCount === 2 || cell.neighborsCount === 3 ? true : false
      } else {
        cell.alive = cell.neighborsCount === 3 ? true : false
      }
      return cell
    }
    render () {
      const { cells, generation, size } = this.state
      return (
        <WrappedComponent
          cells={cells}
          resetGeneration={this.resetGeneration}
          generation={generation}
          setNextGeneration={this.setNextGeneration}
          toggleAlive={this.toggleAlive}
          randomlySetCellsAlive={this.randomlySetCellsAlive}
          killCells={this.killCells}
          buildCells={this.buildCells}
          size={size}
        />
      )
    }
  }
  return Container
}

export default WithCells
