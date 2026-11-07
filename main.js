import { knightMoves } from "./knight.js";

function isKnightStep(a, b) {
  const dx = Math.abs(a[0] - b[0]);
  const dy = Math.abs(a[1] - b[1]);
  return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
}

function check(start, end, expectedMoves) {
  console.log("\nknightMoves([" + start + "], [" + end + "])");
  const path = knightMoves(start, end);

  const startsRight = path[0][0] === start[0] && path[0][1] === start[1];
  const last = path[path.length - 1];
  const endsRight = last[0] === end[0] && last[1] === end[1];
  const stepsLegal = path.every(
    (square, i) => i === 0 || isKnightStep(path[i - 1], square)
  );
  const lengthRight = path.length - 1 === expectedMoves;

  console.log(
    startsRight && endsRight && stepsLegal && lengthRight
      ? "✔ PASS"
      : "✘ FAIL (expected " + expectedMoves + " moves)"
  );
}

check([0, 0], [1, 2], 1);
check([0, 0], [3, 3], 2);
check([3, 3], [0, 0], 2);
check([3, 3], [4, 3], 3);
check([0, 0], [7, 7], 6);
check([7, 7], [0, 0], 6);
check([0, 0], [1, 1], 4);
check([4, 4], [4, 4], 0);

console.log("\n--- Invalid input ---");
try {
  knightMoves([8, 0], [0, 0]);
} catch (error) {
  console.log(error.name + ": " + error.message);
}