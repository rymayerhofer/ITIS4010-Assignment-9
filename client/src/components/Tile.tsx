import { useNumberPuzzle } from "@/lib/stores/useNumberPuzzle";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TileProps {
  value: number | null;
  index: number;
  onClick: () => void;
}

const Tile = ({ value, index, onClick }: TileProps) => {
  const { isValidMove, targetSequence } = useNumberPuzzle();
  const isEmptyTile = value === null;
  const canMove = isValidMove(index);
  
  // Check if this tile is in the correct position for the target sequence
  const isCorrect = value !== null && targetSequence[index] === value;
  
  return (
    <motion.div
      layout
      onClick={canMove ? onClick : undefined}
      className={cn(
        "w-full aspect-square flex items-center justify-center rounded-md text-2xl font-bold shadow transition-all",
        isEmptyTile ? "bg-transparent shadow-none" : "bg-white cursor-pointer",
        canMove && !isEmptyTile ? "hover:bg-indigo-100 hover:scale-105" : "",
        isCorrect ? "bg-green-100 border-2 border-green-400" : "",
      )}
      whileTap={canMove && !isEmptyTile ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {value !== null && (
        <span className={cn(
          "text-center",
          isCorrect ? "text-green-700" : "text-indigo-700"
        )}>
          {value}
        </span>
      )}
    </motion.div>
  );
};

export default Tile;
