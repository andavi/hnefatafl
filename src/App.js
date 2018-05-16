import React, { Component } from 'react';
import './App.css';

const NUM_SQUARES = 11;  // NUM_SQUARES x NUM_SQUARES
const SQUARE_SIZE = 50;

const initialSetup = [
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
];

class App extends Component {
constructor(props) {
  super(props);

  this.state = {
    attackerTurn: true,
    selectedPiece: null,
    board: initialSetup
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
    if (this.state.attackerTurn && this.state.board[row][col] === 'a') {
      this.setState({ 
        selectedPiece: { row, col },
      });
    } else if (!this.state.attackerTurn && this.state.board[row][col]
        && this.state.board[row][col] !== 'a') {
      this.setState({ 
        selectedPiece: { row, col },
      });
    } 
  }

  /////////////////////////////////
  // GAME LOGIC
  /////////////////////////////////

  onMove = (row, col) => {
    const origin = this.state.selectedPiece;
    if (origin && this.isLegal(origin, { row, col })) {
      const newBoard = this.state.board.map(row => [...row]);  // deep copy
      newBoard[origin.row][origin.col] = '';
      newBoard[row][col] = this.state.board[origin.row][origin.col];
      const captures = this.getCaptures({ row, col });
      this.setState({
        board: newBoard,
        selectedPiece: null,
        attackerTurn: !this.state.attackerTurn
      });
    }
  }

  isAttacker = (square) => this.state.board[square.row][square.col] === 'a'
    || this.state.board[square.row][square.col] === 'k';

  isDefender = (square) => this.state.board[square.row][square.col] === 'd';

  isEmptyRefuge = (square) => this.isRefuge(square) && this.isNotOccupied(square);

  isCapture = (first, second) => {

  }

  getCaptures = (square) => {
    const captures = [];
    return captures;
  }

  isNotOccupied = (square) => !this.state.board[square.row][square.col];

  isOrthogonal = (origin, dest) => origin.row === dest.row || origin.col === dest.col;

  isNotBlocked = (origin, dest) => {
    // check along column
    if (origin.col === dest.col) {
      // rows ascending: destp dest botdestm
      if (origin.row < dest.row) {
        for (let i = origin.row + 1; i < dest.row; i++) {
          if (this.state.board[i][origin.col]) {
            return false;
          }
        }
        // rows descending: botdestm dest destp
      } else {
        for (let i = origin.row - 1; i > dest.row; i--) {
          if (this.state.board[i][origin.col]) {
            console.log(this.state.board[i][origin.col], i, origin.col);
            return false;
          }
        }
      }
      // check along row
    } else {
      // columns ascending: left dest right
      if (origin.col < dest.col) {
        for (let j = origin.col + 1; j < dest.col; j++) {
          if (this.state.board[origin.row][j]) {
            return false;
          }
        }
        // columns descending: right dest left
      } else {
        for (let j = origin.col - 1; j > dest.col; j--) {
          if (this.state.board[origin.row][j]) {
            return false;
          }
        }
      }
    }
    return true;
  }

  isRefuge = (square) => 
    ((square.row === 0 && square.col === 0) 
      || (square.row === 10 && square.col === 0)
      || (square.row === 0 && square.col === 10) 
      || (square.row === 10 && square.col ===10)
      || (square.row === 5 && square.col ===5));

  ifRefugeIsKing = (origin, dest) =>
    this.isRefuge(dest) ? this.state.board[origin.row][origin.col] === 'k' : true;

  isLegal = (origin, dest) => {
    return this.isNotOccupied(dest) && this.isOrthogonal(origin, dest) 
      && this.isNotBlocked(origin, dest) && this.ifRefugeIsKing(origin, dest);
  }

  /////////////////////////////////
  // RENDER
  /////////////////////////////////

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
        <div className='header tc'>
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
        <div className='tc footer'>
          {this.state.attackerTurn 
            ? "Black's Turn" 
            : "White's Turn"
          }
        </div>
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
        className={((isSelected(row, col) && 'bg-mid-gray ') || 'bg-black ') 
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
        className={((isSelected(row, col) && 'bg-light-blue ') || 'bg-white ') 
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
