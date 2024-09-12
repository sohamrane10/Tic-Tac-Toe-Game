const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick} disabled={value !== null}>
      {value}
    </button>
  );
};

const Board = () => {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = React.useState(true);
  const [gameOver, setGameOver] = React.useState(false);
  const [draw, setDraw] = React.useState(false);

  const handleClick = (index) => {
    if (calculateWinner(squares) || squares[index] || gameOver) return;

    const nextSquares = squares.slice();
    nextSquares[index] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    setIsXNext(!isXNext);

    // Check for a draw
    if (!nextSquares.includes(null) && !calculateWinner(nextSquares)) {
      setDraw(true);
      setGameOver(true);
    }

    // Check for a winner
    if (calculateWinner(nextSquares)) {
      setGameOver(true);
    }
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : draw
    ? "It's a Draw!"
    : `Next Player: ${isXNext ? "X" : "O"}`;

  // Restart the game
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setDraw(false);
  };

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((square, index) => (
          <Square key={index} value={square} onClick={() => handleClick(index)} />
        ))}
      </div>
      {gameOver && <button className="restart" onClick={resetGame}>Start New Game</button>}
    </div>
  );
};

const calculateWinner = (squares) => {
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

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

ReactDOM.render(<Board />, document.getElementById('root'));
