import { create } from "zustand";
import { useAudio } from "./useAudio";

// The target sequence we want to achieve
const TARGET_SEQUENCE = [8, 0, 1, 3, 5, 6, 0, 6, null];

interface NumberPuzzleState {
  grid: (number | null)[];
  moveCount: number;
  isWin: boolean;
  targetSequence: (number | null)[];
  moveTile: (index: number) => void;
  isValidMove: (index: number) => boolean;
  resetGame: () => void;
}

export const useNumberPuzzle = create<NumberPuzzleState>((set, get) => {
  // Initialize grid with shuffled numbers
  const initializeGrid = (): (number | null)[] => {
    // Start with the solved state
    const sequence = [...TARGET_SEQUENCE];
    
    // Perform random valid moves to shuffle
    // This guarantees the puzzle is solvable
    let emptyIndex = sequence.findIndex(val => val === null);
    
    // Make random valid moves to ensure it's sufficiently shuffled
    for (let i = 0; i < 100; i++) {
      const possibleMoves = [];
      
      // Check all four directions
      if (emptyIndex >= 3) possibleMoves.push(emptyIndex - 3); // Up
      if (emptyIndex < 6) possibleMoves.push(emptyIndex + 3); // Down
      if (emptyIndex % 3 > 0) possibleMoves.push(emptyIndex - 1); // Left
      if (emptyIndex % 3 < 2) possibleMoves.push(emptyIndex + 1); // Right
      
      // Randomly select one of the valid moves
      const randomMoveIndex = Math.floor(Math.random() * possibleMoves.length);
      const tileToMove = possibleMoves[randomMoveIndex];
      
      // Swap the tile with the empty space
      [sequence[emptyIndex], sequence[tileToMove]] = [sequence[tileToMove], sequence[emptyIndex]];
      emptyIndex = tileToMove;
    }
    
    return sequence;
  };

  return {
    grid: initializeGrid(),
    moveCount: 0,
    isWin: false,
    targetSequence: TARGET_SEQUENCE,

    // Check if a move is valid (must be adjacent to empty tile)
    isValidMove: (index: number): boolean => {
      const { grid } = get();
      const emptyIndex = grid.findIndex(val => val === null);
      
      // Check if the clicked tile is adjacent to the empty tile
      const row = Math.floor(index / 3);
      const col = index % 3;
      const emptyRow = Math.floor(emptyIndex / 3);
      const emptyCol = emptyIndex % 3;
      
      // Adjacent means the tile is either in the same row or same column and one step away
      return (
        (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
        (col === emptyCol && Math.abs(row - emptyRow) === 1)
      );
    },

    // Move a tile
    moveTile: (index: number): void => {
      const { grid, isValidMove } = get();
      
      if (!isValidMove(index)) return;
      
      // Play movement sound
      const { playHit } = useAudio.getState();
      playHit();
      
      const newGrid = [...grid];
      const emptyIndex = newGrid.findIndex(val => val === null);
      
      // Swap the clicked tile with the empty tile
      [newGrid[index], newGrid[emptyIndex]] = [newGrid[emptyIndex], newGrid[index]];
      
      // Check for win
      const hasWon = newGrid.every((val, idx) => val === TARGET_SEQUENCE[idx]);
      
      set({
        grid: newGrid,
        moveCount: get().moveCount + 1,
        isWin: hasWon
      });
    },

    // Reset the game
    resetGame: (): void => {
      set({
        grid: initializeGrid(),
        moveCount: 0,
        isWin: false
      });
    }
  };
});
