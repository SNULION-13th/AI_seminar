import "./App.css";
import { useState } from 'react';

function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <button 
      className={`
        w-16 h-16 border-2 border-gray-600 bg-white text-2xl font-bold 
        hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500
        ${isWinningSquare ? 'bg-green-200' : ''}
      `}
      onClick={onSquareClick}
    >
      <span className={value === 'X' ? 'text-blue-600' : 'text-red-600'}>
        {value}
      </span>
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, winningSquares = [] }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];
  
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.every(square => square !== null)) {
    status = "It's a draw!";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`mb-6 text-xl font-bold p-4 rounded-lg ${
        winner 
          ? 'bg-green-100 text-green-800 border-2 border-green-300' 
          : 'bg-blue-100 text-blue-800 border-2 border-blue-300'
      }`}>
        {status}
      </div>
      <div className="grid grid-cols-3 gap-1 bg-gray-600 p-2 rounded-lg shadow-lg">
        {squares.map((square, i) => (
          <Square 
            key={i}
            value={square} 
            onSquareClick={() => handleClick(i)}
            isWinningSquare={winningLine.includes(i)}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move} className="mb-2">
        <button 
          onClick={() => jumpTo(move)}
          className={`
            px-4 py-2 rounded-lg font-medium transition-colors duration-200
            ${move === currentMove 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Tic Tac Toe
        </h1>
        
        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 max-w-6xl mx-auto">
          {/* Game Board */}
          <div className="flex-1 flex justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
              
              <div className="mt-6 text-center">
                <button 
                  onClick={resetGame}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
                >
                  Reset Game
                </button>
              </div>
            </div>
          </div>

          {/* Game History */}
          <div className="flex-1 max-w-md">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Game History</h2>
              <div className="max-h-96 overflow-y-auto">
                <ol className="space-y-1">{moves}</ol>
              </div>
            </div>
          </div>
        </div>

        {/* Game Rules */}
        <div className="mt-12 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">How to Play</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Players take turns placing X's and O's on the board</li>
            <li>• First player to get 3 in a row (horizontal, vertical, or diagonal) wins</li>
            <li>• If all 9 squares are filled without a winner, it's a draw</li>
            <li>• Use the history panel to review or return to previous moves</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: [a, b, c]
      };
    }
  }
  return null;
}

export default App;
