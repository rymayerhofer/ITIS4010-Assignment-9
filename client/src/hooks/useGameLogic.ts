import { useState, useEffect, useCallback } from 'react';

// The target sequence we want to achieve
const TARGET_SEQUENCE = [8, 0, 1, 3, 5, 6, 0, 6, null];

export const useGameLogic = () => {
  // Initialize the grid with shuffled numbers
  const [grid, setGrid] = useState<(number | null)[]>([]);
  const [moveCount, setMoveCount] = useState(0);
  const [isWin, setIsWin] = useState(false);

  // Function to check if a move is valid (must be adjacent to empty tile)
  const isValidMove = useCallback((index: number): boolean => {
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
  }, [grid]);

  // Function to move a tile
  const moveTile = useCallback((index: number): void => {
    if (!isValidMove(index)) return;
    
    const newGrid = [...grid];
    const emptyIndex = newGrid.findIndex(val => val === null);
    
    // Swap the clicked tile with the empty tile
    [newGrid[index], newGrid[emptyIndex]] = [newGrid[emptyIndex], newGrid[index]];
    
    setGrid(newGrid);
    setMoveCount(prev => prev + 1);
  }, [grid, isValidMove]);

  // Function to check if the player has won
  const checkWin = useCallback((): void => {
    const hasWon = grid.every((val, index) => val === TARGET_SEQUENCE[index]);
    setIsWin(hasWon);
  }, [grid]);

  // Function to shuffle the grid for a new game
  const shuffleGrid = useCallback((): void => {
    // We start with the solved state
    const sequence = [...TARGET_SEQUENCE];
    
    // Perform random valid moves to shuffle
    // This guarantees the puzzle is solvable
    let emptyIndex = sequence.findIndex(val => val === null);
    
    // Make at least 100 random valid moves to ensure it's sufficiently shuffled
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
    
    setGrid(sequence);
    setMoveCount(0);
    setIsWin(false);
  }, []);

  // Initialize the game
  useEffect(() => {
    shuffleGrid();
  }, [shuffleGrid]);

  // Check for win after each move
  useEffect(() => {
    if (grid.length > 0) {
      checkWin();
    }
  }, [grid, checkWin]);

  // Reset the game
  const resetGame = useCallback(() => {
    shuffleGrid();
  }, [shuffleGrid]);

  return {
    grid,
    moveCount,
    isWin,
    moveTile,
    isValidMove,
    resetGame,
    targetSequence: TARGET_SEQUENCE,
  };
};
