import React, { Component } from 'react';
import './App.css';

const NUM_SQUARES = 11;  // NUM_SQUARES x NUM_SQUARES
const SQUARE_SIZE = 50;

class App extends Component {
constructor(props) {
  super(props);

  this.state = {
    selectedPiece: null,
    board: [
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
  }
}

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
    return 'bg-washed-white';
  }

  hasPiece = (row, col) => {
    return this.state.board[row][col];
  }

  onSelect = (row, col) => {
    this.setState({ selectedPiece: { row, col }});
  }

  onMove = (row, col) => {
    if (this.state.selectedPiece) {
      const from = this.state.selectedPiece;
      const newBoard = this.state.board.map(row => [...row]);  // deep copy
      newBoard[from.row][from.col] = '';
      newBoard[row][col] = this.state.board[from.row][from.col];
      this.setState({
        board: newBoard,
        selectedPiece: null
      });
    }
  }

  isSelected = (row, col) => {
    if (this.state.selectedPiece){
      return this.state.selectedPiece.row === row 
&& this.state.selectedPiece.col === col;
    }
    return false;
  }

  render() {
    return (
      <div>
        <div className='tc'>
          <p className='f2 mb0'>Hnefatafl</p>
          <p className='f4 mt0'>Viking Chess</p>
        </div>
        <Board 
          paint={this.paint} 
          hasPiece={this.hasPiece}
          numSquares={NUM_SQUARES} 
          squareSize={SQUARE_SIZE}
          onSelect={this.onSelect}
          onMove={this.onMove}
          isSelected={this.isSelected}
        />
      </div>
    );
  }
}

const Board = ({ 
  numSquares, 
  squareSize, 
  paint, 
  hasPiece,
  onSelect,
  onMove,
  isSelected 
}) => {
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
        onSelect={onSelect}
        onMove={onMove}
        isSelected={isSelected}
      />)
  }
  return (
    <div 
      className="ba center ma3"
      style={{ width: numSquares * squareSize, height: numSquares * squareSize}}
    >{rows}</div>);
}

const Row = ({ 
  numSquares, 
  squareSize, 
  row, 
  paint, 
  hasPiece,
  onSelect,
  onMove,
  isSelected 
}) => {
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
        onSelect={onSelect}
        onMove={onMove}
        isSelected={isSelected}
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
  hasPiece,
  onSelect,
  onMove,
  isSelected
} ) => {
  const edgeSize = 1 / numSquares * 100 + '%';
  const color = paint(row, col);
  return (
    <div 
        className={'fl ba ' + color}
        style={{ width: edgeSize, height: squareSize }}
        onClick={() => onMove(row, col)}
      >
      { !hasPiece(row, col)
        ? null
        : ( hasPiece(row, col) === 'a' 
            ? <Attacker
              squareSize={squareSize}
              row={row}
              col={col}
              onSelect={onSelect}
              isSelected={isSelected}
              />
            : <Defender 
              squareSize={squareSize} 
              row={row}
              col={col}
              isKing={hasPiece(row, col) === 'k'}
              onSelect={onSelect}
              isSelected={isSelected}
              /> 
          )
      }    
    </div>
  );
}

const Attacker = ({ 
  squareSize, 
  row, 
  col,
  onSelect,
  isSelected 
}) => {
  return (
    <div 
        className={((isSelected(row, col) && 'bg-dark-gray ') || 'bg-black ') 
+ 'shadow-5 grow bw2 pointer tc f3 pt1 br-100 ba b--white center mt1'}
        style={{
          width: squareSize * .8, 
          height: squareSize * .8,
        }}
        onClick={() => onSelect(row, col)}
      >
      </div>
  );
}

const Defender = ({ 
  squareSize, 
  row, 
  col, 
  isKing,
  onSelect,
  isSelected
}) => {
  return (
    <div 
        className={((isSelected(row, col) && 'bg-light-gray ') || 'bg-white ') 
+ 'shadow-5 grow bw2 pointer tc f3 b br-100 ba center mt1'}
        style={{
          width: squareSize * .8, 
          height: squareSize * .8,
        }}
        onClick={() => onSelect(row, col)}
      >
        { isKing
        ? <Cross squareSize={squareSize} />
        : null
      }
      </div>
  );
};

const Cross = ({ squareSize }) => {
  return (
    <div>
      <div 
        className='bg-black'
        style={{
          width: squareSize * .1, 
          height: squareSize * .7,
          marginLeft: '44%'
        }}
      ></div>
      <div 
        className='bg-black mb5'
        style={{
          width: squareSize * .7, 
          height: squareSize * .1,
          marginTop: '-70%',
        }}
      ></div>
      <div
        className='br-100 ba bg-black'
        style={{
          width: squareSize * .35,
          height: squareSize * .35,
          marginTop: '-230%',
          marginLeft: '23%'
        }}
      ></div>
    </div>
  );
}

export default App;
