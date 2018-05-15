import React, { Component } from 'react';
import './App.css';

const NUM_SQUARES = 11;  // NUM_SQUARES x NUM_SQUARES
const SQUARE_SIZE = 50;

class App extends Component {
  render() {
    return (
      <div>
        <div className='tc'>
          <p className='f2'>Hnefatafl</p>
        </div>
        <Board numSquares={NUM_SQUARES} squareSize={SQUARE_SIZE}/>
      </div>
    );
  }
}

const Board = ({ numSquares, squareSize }) => {
  const rows = [];

  for (let i=0; i < numSquares; i++) {
    rows.push(
      <Row 
        numSquares={numSquares} 
        squareSize={squareSize} 
        key={i}
      />)
  }
  return (
    <div 
      className="ba center ma3"
      style={{ width: numSquares * squareSize, height: numSquares * squareSize}}
    >{rows}</div>);
}

const Row = ({ numSquares, squareSize }) => {
  const squares = [];
  const edgeSize = 1 / numSquares * 100 + '%';

  for (let i = 0; i < numSquares; i++) { 
    squares.push(
      <div 
        className='fl ba' 
        style={{ width: edgeSize, height: squareSize }}
        key={i}
      ></div>);
  }
  return(
    <div style={{ width: squareSize * numSquares }}>
      {squares}
    </div>);
}

export default App;
