import React, { Component } from 'react';
import './App.css';

const NUM_SQUARES = 11;  // NUM_SQUARES x NUM_SQUARES
const SQUARE_SIZE = 80;

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
    board: initialSetup,
    kingPosition: {row: 5, col: 5},
    winner: null
  }
}

  paint = (row, col) => {
    if ((row === 0 && col === 0)
      || (row === 0 && col === 10)
      || (row === 10 && col === 0)
      || (row === 10 && col === 10)
      || (row === 5 && col === 5)
    ) {
      return 'bg-light-red';
    } else if ((row === 0 && (col > 2 && col < 8))
      || (row === 10 && (col > 2 && col < 8))
      || (col === 0 && (row > 2 && row < 8))
      || (col === 10 && (row > 2 && row < 8))
      || (row === 1 && col === 5)
      || (row === 9 && col === 5)
      || (row === 5 && col === 1)
      || (row === 5 && col === 9)
      ) {
      return 'bg-dark-gray b--gray';
    } else if ((row === 3 && col === 5)
      || (row === 4 && (col > 3 && col < 7))
      || (row === 5 && (col > 2 && col < 5))
      || (row === 5 && (col > 5 && col < 8))
      || (row === 6 && (col > 3 && col < 7)) 
      || (row === 7 && col === 5) 
      ) {
      return 'bg-light-blue';
    }
    return 'bg-white';
  }

  hasPiece = (row, col) => {
    return this.state.board[row][col];
  }

  onSelect = (row, col) => {
    // check game over condition
    if (!this.state.winner) {
      // if attacker's turn and attacker chosen
      if (this.state.attackerTurn && this.isAttacker({ row, col })) {
        this.setState({ 
          selectedPiece: { row, col },
        });
        // if defender's turn and defender chosen
      } else if (!this.state.attackerTurn && this.isDefender({ row, col })) {
        this.setState({ 
          selectedPiece: { row, col },
        });
      } 
    }
    
  }

  /////////////////////////////////
  // GAME LOGIC
  /////////////////////////////////

  onMove = (row, col) => {

    // check if piece is selected and attempted move is legal
    const selected = this.state.selectedPiece;
    if (selected && this.isLegal(selected, { row, col })) {



      // deep copy board & move selected piece on newBoard
      const newBoard = this.state.board.map(row => [...row]);  
      newBoard[selected.row][selected.col] = '';
      newBoard[row][col] = this.state.board[selected.row][selected.col];

      // check for captures and update newBoard
      const captures = this.getCaptures({ row, col });
      captures.forEach(square => newBoard[square.row][square.col] = '');

      // check for win condition & end game if true
      const winner = this.checkWinCondition(
        (this.isKing(selected) ? { row, col } : this.state.kingPosition), newBoard);

      this.setState({
        board: newBoard,
        selectedPiece: null,
        attackerTurn: !this.state.attackerTurn,
        kingPosition: this.isKing(selected) 
          ? { row, col } 
          : this.state.kingPosition,
        winner: winner
      });
    }
  }

  isKing = (square) => this.state.board[square.row][square.col] === 'k';

  checkWinCondition = (king, board) => {
    // king escaped to corner
    if (this.isRefuge(king) && !(king.row === 5 && king.col === 5)) {
      return 'White';
      // king not on edge & surrounded on four sides by attackers
    } else if (!(king.row === 0 || king.row === 10
        || king.col === 0 || king.col === 10) 
        && board[king.row + 1][king.col] === 'a'
          && board[king.row - 1][king.col] === 'a'
          && board[king.row][king.col + 1] === 'a'
          && board[king.row][king.col - 1] === 'a') {
      return 'Black';
    }
    return null;
  } 

  isDefender = (square) => this.state.board[square.row][square.col] === 'd'
    || this.state.board[square.row][square.col] === 'k';

  isAttacker = (square) => this.state.board[square.row][square.col] === 'a';

  getColor = (square) => {
    if (this.isAttacker(square)) {
      return 'black';
    } else if (this.isDefender(square)) {
      return 'white';
    } else if (this.isRefuge(square)) {
      return 'red';
    } 
    return 'empty';
  }

  isCapture = (first, second, third) => {
    if (this.state.board[second.row][second.col] === 'k') {
      return false;
    }
    const firstColor = this.getColor(first);
    const secondColor = this.getColor(second);
    const thirdColor = this.getColor(third);
    // captures occur if: wbw, wbr, bwb, or bwr
    return ((firstColor === 'white' && secondColor === 'black' && thirdColor === 'white')
      || (firstColor === 'white' && secondColor === 'black' && thirdColor === 'red')
      || (firstColor === 'black' && secondColor === 'white' && thirdColor === 'black')
      || (firstColor === 'black' && secondColor === 'white' && thirdColor === 'red'))
  }

  getCaptures = (square) => {
    const selected = this.state.selectedPiece;
    const captures = [];
    // north
    if (square.row - 2 >= 0) {
      const north = { 
          row: square.row - 1, 
          col: square.col 
        }
        const northWing = { 
          row: square.row - 2,
          col: square.col
        }
      if (this.isCapture(selected, north, northWing)){
        captures.push(north)
      }
    }
    // south
    if (square.row + 2 <= 10) {
      const south = { 
          row: square.row + 1, 
          col: square.col 
        }
        const southWing = { 
          row: square.row + 2,
          col: square.col
        }
      if (this.isCapture(selected, south, southWing)){
        captures.push(south)
      }
    }
    // west
    if (square.row + 2 >= 0) {
      const west = { 
          row: square.row , 
          col: square.col - 1
        }
        const westWing = { 
          row: square.row,
          col: square.col - 2
        }
      if (this.isCapture(selected, west, westWing)){
        captures.push(west)
      }
    }
    // east
    if (square.col + 2 <= 10) {
      const east = { 
          row: square.row, 
          col: square.col + 1 
        }
        const eastWing = { 
          row: square.row,
          col: square.col + 2
        }
      if (this.isCapture(selected, east, eastWing)){
        captures.push(east)
      }
    }
    return captures;
  }

  isEmpty = (square) => !this.state.board[square.row][square.col];

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
    return this.isEmpty(dest) && this.isOrthogonal(origin, dest) 
      && this.isNotBlocked(origin, dest) && this.ifRefugeIsKing(origin, dest);
  }

  isSelected = (row, col) => {
    if (this.state.selectedPiece){
      return this.state.selectedPiece.row === row 
        && this.state.selectedPiece.col === col;
    }
    return false;
  }

  /////////////////////////////////
  // RENDER
  /////////////////////////////////

  render() {
    return (
      <div>
        <div className='header tc'>
          <p className='f1 mb0'>Hnefatafl</p>
          <p className='f3 mb0 mt0'>Viking Chess</p>
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
        { this.state.winner
          ? <div className='tc f2'>
            {this.state.winner + ' Wins!'}
          </div> 
          :<div className='f3 tc footer'>
            {this.state.attackerTurn 
              ? "Black's Turn" 
              : "White's Turn"
            }
          </div>
        }
        
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
        className={'fl ba pt2 ' + color}
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
+ 'shadow-5 grow bw2 pointer tc f3 pt1 br-100 ba b--white center'}
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
+ 'shadow-5 grow bw2 pointer tc f3 b br-100 ba center'}
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
    <div className="cross pt3" 
      style = {{
        width: squareSize * .7,
        height: squareSize * .7
     }}>
      <div className="bg-black br-100 center"
        style = {{
      width: squareSize * .3,
      height: squareSize * .3
    }}></div>
    </div>
  );
}

export default App;
