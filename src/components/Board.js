import React from 'react';

const Board = ({ 
  numSquares, 
  squareSize, 
  paint, 
  hasPiece,
  onSelect,
  onMove,
  isSelected 
}) => {
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
    return 'bg-washed-white b--dark-gray';
  }
  
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
        className={'fl ba pt1 ' + color}
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
+ 'shadow-5 grow bw1 pointer tc f3 br-100 ba b--white center'}
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
        className={((isSelected(row, col) && 'bg-lightest-blue ') || 'bg-white ') 
+ 'shadow-5 grow bw1 pointer tc f3 b br-100 ba center'}
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
    <div className="cross pt2" 
      style = {{
        width: squareSize * .75,
        height: squareSize * .75,
     }}>
      <div className="bg-black br-100 center"
        style = {{
      width: squareSize * .3,
      height: squareSize * .3,
      marginTop: '8%',
      marginRight: '30%'
    }}></div>
    </div>
  );
}

export default Board;