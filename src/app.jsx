import { useState, useEffect } from "react";

const isMovePossible = (src, dest) => {
  return (
    (Math.abs(src[0] - dest[0]) == 2 && Math.abs(src[1] - dest[1]) == 1) ||
    (Math.abs(src[0] - dest[0]) == 1 && Math.abs(src[1] - dest[1]) == 2)
  );
};

const isStateGameOver = (mat) => {
  let notFilled = 0;
  let validMoves = 0;
  mat.forEach((row) => {
    row.forEach((state) => {
      if (state == 0) {
        notFilled += 1;
      } else if (state == 3) {
        validMoves += 1;
      }
    });
  });
  return validMoves == 0 && notFilled != 64;
};

const App = () => {
  /* States:
    0: not filled
    1: filled
    2: current position
    3: can go there */
  const [currentPosition, setCurrentPosition] = useState([-1000, -1000]);
  const [lastPosition, setLastPosition] = useState([-1000, -1000]);
  const [moves, setMoves] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const [grid, setGrid] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  useEffect(() => {
    let newGrid = [];
    grid.forEach((row, i) => {
      let newRow = [];
      row.forEach((state, j) => {
        if (lastPosition[0] == i && lastPosition[1] == j) {
          newRow.push(1);
        } else if (currentPosition[0] == i && currentPosition[1] == j) {
          newRow.push(2);
        } else if (isMovePossible(currentPosition, [i, j]) && state != 1) {
          newRow.push(3);
        } else {
          newRow.push(state == 3 ? 0 : state);
        }
      });
      newGrid.push(newRow);
    });
    setGrid(newGrid);
    setIsGameOver(isStateGameOver(newGrid));
  }, [currentPosition, lastPosition]);

  return (
    <div className="gridWrapper">
      <h1>Chess: Horse Puzzle</h1>
      <p>Moves successfully made: {moves}</p>
      {isGameOver && (
        <div className="gameOver">
          <p>Game over!</p>
          <button
            onClick={() => {
              setCurrentPosition([-1000, -1000]);
              setLastPosition([-1000, -1000]);
              setMoves(0);
              setIsGameOver(false);
              setGrid([
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
              ]);
            }}
          >
            Restart
          </button>
        </div>
      )}
      <div className="chessBoard">
        {grid.map((row, i) => {
          return (
            <div className="gridRow" key={i}>
              {row.map((state, j) => {
                if (state == 0) {
                  // not filled
                  return (
                    <div
                      className="grid"
                      key={[i, j]}
                      onClick={() => {
                        if (currentPosition[0] == -1000) {
                          // Set as current position
                          setCurrentPosition([i, j]);
                          setMoves((oldMoves) => oldMoves + 1);
                        }
                      }}
                    ></div>
                  );
                } else if (state == 1) {
                  // filled
                  return <div className="grid black" key={[i, j]}></div>;
                } else if (state == 2) {
                  // current position
                  return (
                    <div className="grid blue" key={[i, j]}>
                      <img
                        src="knight.png"
                        alt="Knight"
                        className="knight-img"
                      />
                    </div>
                  );
                } else if (state == 3) {
                  // can go there
                  return (
                    <div
                      className="grid green"
                      key={[i, j]}
                      onClick={() => {
                        setLastPosition(currentPosition);
                        setCurrentPosition([i, j]);
                        setMoves((oldMoves) => oldMoves + 1);
                      }}
                    ></div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
