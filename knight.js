const BOARD_SIZE = 8;

// The eight possible knight moves: two steps one way, one step the other
const MOVES = [
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];

function isOnBoard(x, y) {
  return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
}

function isValidSquare(square) {
  return (
    Array.isArray(square) &&
    square.length === 2 &&
    Number.isInteger(square[0]) &&
    Number.isInteger(square[1]) &&
    isOnBoard(square[0], square[1])
  );
}

function toKey(square) {
  return square[0] + "," + square[1];
}

export function knightMoves(start, end) {
  if (!isValidSquare(start) || !isValidSquare(end)) {
    throw new RangeError("Squares must be [x, y] with x and y from 0 to 7.");
  }

  // Remembers where each square was reached FROM (this also marks it visited)
  const cameFrom = new Map();
  cameFrom.set(toKey(start), null);

  const queue = [start];
  let head = 0;

  while (head < queue.length) {
    const current = queue[head];
    head++;

    if (current[0] === end[0] && current[1] === end[1]) {
      break;
    }

    for (const [dx, dy] of MOVES) {
      const nextX = current[0] + dx;
      const nextY = current[1] + dy;
      const next = [nextX, nextY];

      if (isOnBoard(nextX, nextY) && !cameFrom.has(toKey(next))) {
        cameFrom.set(toKey(next), current);
        queue.push(next);
      }
    }
  }

  // Walk the trail backwards from the end to the start
  const path = [];
  let node = [end[0], end[1]];

  while (node !== null) {
    path.unshift(node);
    node = cameFrom.get(toKey(node));
  }

  const moves = path.length - 1;
  const word = moves === 1 ? "move" : "moves";

  console.log("You made it in " + moves + " " + word + "!  Here's your path:");
  path.forEach((square) => {
    console.log("  [" + square[0] + "," + square[1] + "]");
  });

  return path;
}