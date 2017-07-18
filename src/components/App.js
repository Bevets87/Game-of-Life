import React, { Component } from 'react'

import Board from './Board'
import Settings from './Settings'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar'

import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cells: null,
      generation: 0,
      width: null,
      height: null

    }
    this.createCells = this.createCells.bind(this)
    this.updateStateOfCells = this.updateStateOfCells.bind(this)
    this.getNeighborCellsPositions = this.getNeighborCellsPositions.bind(this)
    this.randomizeStateOfCells = this.randomizeStateOfCells.bind(this)
    this.killCell = this.killCell.bind(this)
    this.bringCellToLife = this.bringCellToLife.bind(this)
    this.resetStateOfCells = this.resetStateOfCells.bind(this)

  }
  componentDidMount () {
    var cells;
    window.onresize = function (event) {
      if (event.target.innerWidth > 600) {
        cells = this.createCells(50,50,500)
        this.setState({
          cells: cells,
          width: 50,
          height: 50
        })
      } else {
        cells = this.createCells(30,30,300)
        this.setState({
          cells: cells,
          width: 30,
          height: 30
        })
      }
    }.bind(this)
  }
  componentWillMount () {
    var cells
    var screenSize = window.innerWidth
    if (screenSize >= 600) {
      cells = this.createCells(50,50,500)
      this.setState({
        cells: cells,
        generation: 0,
        width: 50,
        height: 50
      })
    } else {
      cells = this.createCells(30,30,300)
      this.setState({
        cells: cells,
        generation: 0,
        width: 30,
        height: 30
      })
    }
  }
  createCells (width,height, gridSize) {
    var cells = new Array(width * height);
    for (var i = 0; i < cells.length; i++) {
      var state = Math.floor(Math.random() * 2);
      state = state === 0 ? 'dead' : 'alive';
      cells[i] = {
        width: ((1/width) * gridSize),
        height: ((1/height) * gridSize),
        state: state,
        liveNeighbors: 0
      }
    }
    return cells
  }
  updateStateOfCells (getNeighborCellsPositions) {
    var cells = this.state.cells.slice()
    var generation = this.state.generation
    cells.forEach(function(cell,index) {
      var count = 0;
      var neighbors = getNeighborCellsPositions.call(this,index);
      neighbors.forEach(function(neighbor) {
        if (typeof neighbor.north === 'number') {
          if (cells[neighbor.north].state === 'alive') {
            count++;
          }
        }
        else if (typeof neighbor.northEast === 'number') {
          if (cells[neighbor.northEast].state === 'alive') {
            count++;
          }
        }
        else if (typeof neighbor.east === 'number') {
          if (cells[neighbor.east].state === 'alive') {
            count++
          }
        }
        else if (typeof neighbor.southEast === 'number') {
          if (cells[neighbor.southEast].state === 'alive') {
            count++
          }
        }
        else if (typeof neighbor.south === 'number') {
            if (cells[neighbor.south].state === 'alive') {
            count++
          }
        }
        else if (typeof neighbor.southWest === 'number') {
          if (cells[neighbor.southWest].state === 'alive') {
            count++
          }
        }
        else if (typeof neighbor.west === 'number') {
          if (cells[neighbor.west].state === 'alive') {
            count++
          }
        }
        else if (typeof neighbor.northWest === 'number') {
          if (cells[neighbor.northWest].state === 'alive') {
            count++
          }
        }
      })
      cell.liveNeighbors = count;
      })
      cells.forEach(function(cell){
      if (cell.state === 'alive') {
        cell.state = (cell.liveNeighbors >= 2 && cell.liveNeighbors <= 3) ? 'alive' : 'dead'
      }
      if (cell.state === 'dead') {
        cell.state = (cell.liveNeighbors === 3) ? 'alive' : 'dead'
      }
    })
    generation += 1;
    this.setState({
      cells: cells,
      generation: generation
    })
  }
  getNeighborCellsPositions (i) {
    var width = this.state.width;
    var height = this.state.height;
    var totalCells = width * height;
    var positions = [];
    /* TOP ROW */
    //left corner
    if (i === 0) {
      positions[0] = {north : (i - width) + totalCells};
      positions[1] = {northEast : (i - (width - 1)) + totalCells};
      positions[2] = {east : i + 1};
      positions[3] = {southEast : i + (width + 1)};
      positions[4] = {south : i + width};
      positions[5] = {southWest : (i + (width - 1)) + width};
      positions[6] = {west : (i - 1) + (width)};
      positions[7] = {northWest : ((i - (width + 1)) + totalCells) + width};
    }
    //right corner
    if(i === (width - 1)) {
      positions[0] = {north : (i - width) + totalCells};
      positions[1] = {northEast : totalCells - width};
      positions[2] = {east : (i + 1) - width};
      positions[3] = {southEast : (i + (width + 1)) - width};
      positions[4] = {south : i + width};
      positions[5] = {southWest : (i + (width - 1))};
      positions[6] = {west : i - 1};
      positions[7] = {northWest : ((i - (width + 1)) + totalCells)};
    }
    //inside
    if (i < width && (i % width) !== 0 && (i % width) !== (width - 1) ) {
      positions[0] = {north : (i - width) + totalCells};
      positions[1] = {northEast : (i - (width - 1)) + totalCells};
      positions[2] = {east : i + 1};
      positions[3] = {southEast : i + (width + 1)};
      positions[4] = {south : i + width};
      positions[5] = {southWest : i + (width - 1)};
      positions[6] = {west : i - 1};
      positions[7] = {northWest : (i - (width + 1)) + totalCells};
    }
    /* EVERYTHING BEFORE THE LAST ROW */
    //left side
    if (i > width && (i % width) === 0) {
      positions[0] = {north : i - width};
      positions[1] = {northEast : i - (width - 1)};
      positions[2] = {east : i + 1};
      positions[3] = {southEast : i + (width + 1)};
      positions[4] = {south : i + width};
      positions[5] = {southWest : (i + (width - 1)) + width};
      positions[6] = {west : (i - 1) + width};
      positions[7] = {northWest : (i - (width + 1)) + width};
    }
   //right side NOT WORKING
   if (i > width && (i % width) === (width - 1)) {
      positions[0] = {north : i - width};
      positions[1] = {northEast : (i - (width - 1)) - width};
      positions[2] = {east : (i + 1) - width};
      positions[3] = {southEast : (i + (width + 1)) - width};
      positions[4] = {south : i + width};
      positions[5] = {southWest : (i + (width - 1))};
      positions[6] = {west : (i - 1)};
      positions[7] = {northWest : (i - (width + 1))};
    }
   //inside
   if (i > width && (i % width) !== 0 && (i % width) !== (width - 1)) {
      positions[0] = {north : i - width};
      positions[1] = {northEast : (i - (width - 1))};
      positions[2] = {east : (i + 1)};
      positions[3] = {southEast : (i + (width + 1))};
      positions[4] = {south : i + width};
      positions[5] = {southWest : (i + (width - 1))};
      positions[6] = {west : (i - 1)};
      positions[7] = {northWest : (i - (width + 1))};
    }
  /*LAST ROW */
  //left corner
  if ((totalCells - i) <= width && ((totalCells - i) % width) === 0) {
      positions[0] = {north : (i - width)};
      positions[1] = {northEast : (i - (width - 1))};
      positions[2] = {east : i + 1};
      positions[3] = {southEast : (i + (width + 1)) - totalCells};
      positions[4] = {south : (i + width) - totalCells};
      positions[5] = {southWest : ((i + (width -1)) - totalCells) + width};
      positions[6] = {west : (i - 1) + width};
      positions[7] = {northWest : (i + (width - 1)) - width};
    }
  //right corner NOT WORKING
  if ((totalCells - i) <= width && (i % width) === (width - 1)) {
      positions[0] = {north : (i - width)};
      positions[1] = {northEast : (i - (width - 1)) - width};
      positions[2] = {east : (i + 1) - width};
      positions[3] = {southEast : ((i + (width + 1)) - totalCells) - width};
      positions[4] = {south : (i + width) - totalCells};
      positions[5] = {southWest : (i + (width - 1)) - totalCells};
      positions[6] = {west : (i - 1)};
      positions[7] = {northWest : (i - (width + 1))};
    }
  //inside
  if ((totalCells - i) <= width && (i % width) !== 0 && (i % width) !== (width - 1)) {
      positions[0] = {north : (i - width)};
      positions[1] = {northEast : (i - (width - 1))};
      positions[2] = {east : i + 1};
      positions[3] = {southEast : i + (width + 1) - totalCells};
      positions[4] = {south : (i + width) - totalCells};
      positions[5] = {southWest : (i + (width - 1)) - totalCells};
      positions[6] = {west : i - 1};
      positions[7] = {northWest : (i - (width + 1))};
    }
     return positions
  }
  randomizeStateOfCells () {
    var cells = this.state.cells.slice();
    cells.forEach(function(cell){
      var state = Math.floor(Math.random() * 2);
      cell.state = state === 0 ? 'dead' : 'alive'
    })
    this.setState({
      cells: cells,
      generation: 0
    })
  }
  resetStateOfCells () {
    var cells = this.state.cells.slice();
    cells.forEach(function(cell){
    cell.state = 'dead'
    })
    this.setState({
      cells: cells,
      generation: 0
    })
  }
  killCell (i) {
    var cells = this.state.cells.slice()
    cells[i].state = 'dead';
    this.setState({
      cells: cells
    })
  }
  bringCellToLife (i) {
    var cells = this.state.cells.slice()
    cells[i].state = 'alive';
    this.setState({
      cells: cells
    })
  }
  render () {
    var { cells } = this.state
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={<h1>Game of Life</h1>}
            showMenuIconButton={false}
          />
          <h1 style={{'color':'rgb(88,110,117)'}}>generation: {this.state.generation}</h1>
          <div className="game-container">
            <Board
            cells={cells}
            killCell={this.killCell}
            bringCellToLife={this.bringCellToLife} />
            <Settings
            updateStateOfCells={this.updateStateOfCells}
            getNeighborCellsPositions={this.getNeighborCellsPositions}
            resetStateOfCells={this.resetStateOfCells}
            randomizeStateOfCells={this.randomizeStateOfCells}/>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
