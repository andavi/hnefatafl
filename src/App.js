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
    return 'bg-white';
  }

  hasPiece = (row, col) => {
    return startPosition[row][col];
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
          hasPiece={this.hasPiece}
          numSquares={NUM_SQUARES} 
          squareSize={SQUARE_SIZE}
        />
      </div>
    );
  }
}

const Board = ({ numSquares, squareSize, paint, hasPiece }) => {
  const rows = [];

  for (let i=0; i < numSquares; i++) {
    rows.push(
      <Row 
        numSquares={numSquares} 
        squareSize={squareSize} 
        key={i}
        row={i}
        paint={paint}
        hasPiece={hasPiece}
      />)
  }
  return (
    <div 
      className="ba center ma3"
      style={{ width: numSquares * squareSize, height: numSquares * squareSize}}
    >{rows}</div>);
}

const Row = ({ numSquares, squareSize, row, paint, hasPiece }) => {
  const squares = [];
  

  for (let i = 0; i < numSquares; i++) { 
    squares.push(
      <Square 
        numSquares={numSquares}
        squareSize={squareSize}
        row={row}
        col={i}
        paint={paint}
        key={i}
        hasPiece={hasPiece}
      />
    );
  }
  return(
    <div style={{ width: squareSize * numSquares }}>
      {squares}
    </div>);
}

const Square = ({ 
  numSquares, 
  squareSize, 
  row, 
  col, 
  paint,
  hasPiece 
} ) => {
  const edgeSize = 1 / numSquares * 100 + '%';
  const color = paint(row, col);
  return (
    <div 
        className={'fl ba ' + color}
        style={{ width: edgeSize, height: squareSize }}
      >
      { !hasPiece(row, col)
        ? null
        : ( hasPiece(row, col) !== 'a' 
            ? <Defender 
              squareSize={squareSize} 
              row={row}
              col={col}
            > { hasPiece(row, col) === 'k'
                ? '+'
                : null
              } 
            </Defender>
            : <Attacker
              squareSize={squareSize}
              row={row}
              col={col}
              />
          )
      }
      
    </div>
  );
}

const Attacker = ({ squareSize, row, col }) => {
  return (
    <div 
        className='bw1 pointer tc f3 pt1 br-100 ba bg-black b--white center v-mid mt1'
        style={{
          width: squareSize * .8, 
          height: squareSize * .8,
        }}
      >
      </div>
  );
}

const Defender = ({ squareSize, row, col, children }) => {
  return (
    <div 
        className='bw1 pointer tc f3 pt1 br-100 ba bg-white center v-mid mt1'
        style={{
          width: squareSize * .8, 
          height: squareSize * .8,
        }}
      >
        {children}
      </div>
  );
};

export default App;
