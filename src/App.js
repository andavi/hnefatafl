import React, { Component } from 'react';
import './App.css';

const NUM_SQUARES = 11;  // NUM_SQUARES x NUM_SQUARES
const SQUARE_SIZE = 50;

const startPosition = [
  ['', '', '', 'a', 'a', 'a', 'a', 'a', '', '', ''],
  ['', '', '', '', '', 'a', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', ''],
  ['a', '', '', '', '', 'd', '', '', '', '', 'a'],
  ['a', '', '', '', 'd', 'd', 'd', '', '', '', 'a'],
  ['a', 'a', '', 'd', 'd', 'k', 'd', 'd', '', 'a', 'a'],
  ['a', '', '', '', 'd', 'd', 'd', '', '', '', 'a'],
  ['a', '', '', '', '', 'd', '', '', '', '', 'a'],
  ['', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', 'a', '', '', '', '', ''],
  ['', '', '', 'a', 'a', 'a', 'a', 'a', '', '', ''],
]

class App extends Component {
  paint = (row, col) => {
    if ((row === 0 && col === 0)
      || (row === 0 && col === 10)
      || (row === 10 && col === 0)
      || (row === 10 && col === 10)
      || (row === 5 && col === 5)
    ) {
      return 'bg-red';
    } else if ((row === 0 && (col > 2 && col < 8))
      || (row === 10 && (col > 2 && col < 8))
      || (col === 0 && (row > 2 && row < 8))
      || (col === 10 && (row > 2 && row < 8))
      || (row === 1 && col === 5)
      || (row === 9 && col === 5)
      || (row === 5 && col === 1)
      || (row === 5 && col === 9)
      ) {
      return 'bg-near-black';
    } else if ((row === 3 && col === 5)
      || (row === 4 && (col > 3 && col < 7))
      || (row === 5 && (col > 2 && col < 5))
      || (row === 5 && (col > 5 && col < 8))
      || (row === 6 && (col > 3 && col < 7)) 
      || (row === 7 && col === 5) 
      ) {
      return 'bg-blue';
    }
    return '';
  }

  render() {
    return (
      <div>
        <div className='tc'>
          <p className='f2'>Hnefatafl</p>
          <p className='f4'>Viking Chess</p>
        </div>
        <Board 
          paint={this.paint} 
          numSquares={NUM_SQUARES} 
          squareSize={SQUARE_SIZE} 
        />
      </div>
    );
  }
}

const Board = ({ numSquares, squareSize, paint }) => {
  const rows = [];

  for (let i=0; i < numSquares; i++) {
    rows.push(
      <Row 
        numSquares={numSquares} 
        squareSize={squareSize} 
        key={i}
        row={i}
        paint={paint}
      />)
  }
  return (
    <div 
      className="ba center ma3"
      style={{ width: numSquares * squareSize, height: numSquares * squareSize}}
    >{rows}</div>);
}

const Row = ({ numSquares, squareSize, row, paint }) => {
  const squares = [];
  

  for (let i = 0; i < numSquares; i++) { 
    squares.push(
      <Square 
        numSquares={numSquares}
        squareSize={squareSize}
        row={row}
        col={i}
        paint={paint}
      />
    );
  }
  return(
    <div style={{ width: squareSize * numSquares }}>
      {squares}
    </div>);
}

const Square = ({ numSquares, squareSize, row, col, paint } ) => {
  const edgeSize = 1 / numSquares * 100 + '%';
  const color = paint(row, col);
  return (
    <div 
        className={'fl ba ' + color}
        style={{ width: edgeSize, height: squareSize }}
        key={col}
      >
        
      </div>
  );
}

const King = () => {
  <div 
    className='tc pointer br-100 ba pt1 f3' 
    style={{ 
      width: SQUARE_SIZE * .8, 
      height: SQUARE_SIZE * .8,
    }}>
    {'+'}
  </div>
}

export default App;
