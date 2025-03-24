import { useNumberPuzzle } from "@/lib/stores/useNumberPuzzle";
import Tile from "./Tile";

const GameBoard = () => {
  const { grid, moveTile } = useNumberPuzzle();

  return (
    <div className="grid grid-cols-3 gap-2 mb-4 aspect-square">
      {grid.map((value, index) => (
        <Tile 
          key={`tile-${index}`}
          value={value} 
          index={index}
          onClick={() => moveTile(index)}
        />
      ))}
    </div>
  );
};

export default GameBoard;
