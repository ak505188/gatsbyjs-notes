import React, { useEffect, useRef } from 'react';

export const Puzzle = ({ width = 300, puzzle, moves }) => {
  const puzzleRef = useRef(null);

  useEffect(() => {
    const canvas = puzzleRef.current;
    const ctx = canvas.getContext('2d');
    ctx.font = 'bold 16px serif';

    let tileWidth = width / 5;
    let lineWidth = tileWidth / 6;

    if (moves) {
      for (const move of moves) {
        const moveX = move[0] % 5 * width / 5;
        const moveY = Math.floor(move[0] / 5) * width / 5;
        ctx.fillStyle = 'yellow';
        ctx.fillRect(moveX, moveY, tileWidth, tileWidth);
        ctx.fillStyle = 'black';
        ctx.fillText(move[1], moveX + 8, moveY + 16);
      }
    }

    for (let i = 0; i < puzzle.length; i++) {
      let x = i % 5 * width / 5;
      let y = Math.floor(i / 5) * width / 5;

      ctx.fillStyle = 'darkblue';
      ctx.strokeRect(x, y, width, width);

      switch(puzzle[i][0]) {
        case 1:
          switch(puzzle[i][1]) {
            case 0:
              ctx.fillRect(x, y+tileWidth/2-lineWidth/2, tileWidth, lineWidth);
              break;
            case 1:
              ctx.fillRect(x+tileWidth/2-lineWidth/2, y, lineWidth, tileWidth);
              break;
          }
          break;
        case 2:
          switch(puzzle[i][1]) {
            case 0:
              ctx.fillRect(x, y+tileWidth/2-lineWidth/2, tileWidth/2+lineWidth/2, lineWidth);
              ctx.fillRect(x+tileWidth/2-lineWidth/2, y, lineWidth, tileWidth/2+lineWidth/2);
              break;
            case 1:
              ctx.fillRect(x+tileWidth/2-lineWidth/2, y, lineWidth, tileWidth/2+lineWidth/2);
              ctx.fillRect(x+tileWidth/2-lineWidth/2, y+tileWidth/2-lineWidth/2, tileWidth/2+lineWidth/2, lineWidth);
              break;
            case 2:
              ctx.fillRect(x+tileWidth/2-lineWidth/2, y+tileWidth/2-lineWidth/2, tileWidth/2+lineWidth/2, lineWidth);
              ctx.fillRect(x+tileWidth/2-lineWidth/2, y+tileWidth/2-lineWidth/2, lineWidth, tileWidth/2+lineWidth/2);
              break;
            case 3:
              ctx.fillRect(x+tileWidth/2-lineWidth/2, y+tileWidth/2-lineWidth/2, lineWidth, tileWidth/2+lineWidth/2);
              ctx.fillRect(x, y+tileWidth/2-lineWidth/2, tileWidth/2+lineWidth/2, lineWidth);
              break;
          }
          break;
        case 3:
          switch(puzzle[i][1]) {
            case 0:
              ctx.fillRect(x, y+tileWidth/2-lineWidth/2, tileWidth, lineWidth);
              ctx.fillRect(x+tileWidth/2-lineWidth/2, y, lineWidth, tileWidth/2+lineWidth/2);
              break;
            case 1:
              ctx.fillRect(x+tileWidth/2-lineWidth/2, y, lineWidth, tileWidth);
              ctx.fillRect(x+tileWidth/2-lineWidth/2, y+tileWidth/2-lineWidth/2, tileWidth/2+lineWidth/2, lineWidth);
              break;
            case 2:
              ctx.fillRect(x, y+tileWidth/2-lineWidth/2, tileWidth, lineWidth);
              ctx.fillRect(x+tileWidth/2-lineWidth/2, y+tileWidth/2-lineWidth/2, lineWidth, tileWidth/2+lineWidth/2);
              break;
            case 3:
              ctx.fillRect(x+tileWidth/2-lineWidth/2, y, lineWidth, tileWidth);
              ctx.fillRect(x, y+tileWidth/2-lineWidth/2, tileWidth/2+lineWidth/2, lineWidth);
              break;
          }
          break;
      }
    }
  }, [puzzle, width]);

  return (
    <canvas ref={puzzleRef} style={{ border: "2px solid black" }} width={width} height={width}/>
  );
};

function mod(n, m) {
  return ((n % m) + m) % m;
}

export const SolvedPuzzle = ({ width = 300, puzzle, moves }) => {
  const newPuzzle = JSON.parse(JSON.stringify(puzzle));
  for (const move of moves) {
    const index = move[0]
    const type = newPuzzle[index][0];
    if (type != 0) {
      const modifier = type == 1 ? 2 : 4;
      newPuzzle[index][1] = mod((newPuzzle[index][1] + move[1]), modifier);
    }
  }
  return <Puzzle width={width} puzzle={newPuzzle}/>;
};

export const PuzzleWithSolution = ({ width = 300, puzzle, moves }) => {
  return (
    <>
      <Puzzle width={width} puzzle={puzzle} moves={moves}/>
      <SolvedPuzzle width={width} puzzle={puzzle} moves={moves}/>
    </>
  );
};

