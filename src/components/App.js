import React, { Component } from 'react';
import './App.css';

import Board from './Board';

const NUM_SQUARES = 11;  // NUM_SQUARES x NUM_SQUARES
const SQUARE_SIZE = 50;  // pixels

const INITIAL_SETUP = [
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
      board: INITIAL_SETUP,
      kingPosition: {row: 5, col: 5},
      winner: null
    }
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



export default App;
