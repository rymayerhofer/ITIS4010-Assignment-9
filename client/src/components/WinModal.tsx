import { Button } from "@/components/ui/button";
import { useNumberPuzzle } from "@/lib/stores/useNumberPuzzle";
import { useAudio } from "@/lib/stores/useAudio";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Award, Trophy, Check } from "lucide-react";

const WinModal = () => {
  const { moveCount, resetGame } = useNumberPuzzle();
  const { playSuccess } = useAudio();
  const { width, height } = useWindowSize();
  const [statsSent, setStatsSent] = useState(false);

  // Play success sound when the modal appears
  useEffect(() => {
    playSuccess();
    
    // Submit game stats to our serverless function
    // This is just demonstration functionality for future analytics
    const submitStats = async () => {
      try {
        const response = await fetch('/api/game-stats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            moveCount,
            rating: getScore(),
            completedAt: new Date().toISOString(),
          }),
        });
        
        if (response.ok) {
          setStatsSent(true);
          console.log('Game stats submitted successfully');
        }
      } catch (error) {
        console.log('Could not submit game stats');
      }
    };
    
    submitStats();
  }, [playSuccess, moveCount]);

  // Calculate score based on moves (the fewer moves, the higher the score)
  const getScore = () => {
    if (moveCount <= 20) return "Perfect!";
    if (moveCount <= 30) return "Excellent!";
    if (moveCount <= 40) return "Great!";
    if (moveCount <= 50) return "Good!";
    return "Well done!";
  };

  return (
    <>
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        gravity={0.1}
      />
      
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg max-w-md w-full p-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 bg-indigo-100 p-4 rounded-full">
              <Trophy className="h-12 w-12 text-indigo-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-indigo-800 mb-2">Congratulations!</h2>
            <p className="text-gray-600 mb-4">
              You solved the puzzle in <span className="font-bold text-indigo-600">{moveCount}</span> moves!
            </p>
            
            <div className="bg-indigo-50 rounded-lg p-4 mb-6 w-full">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="h-5 w-5 text-indigo-600" />
                <h3 className="font-bold text-indigo-700">Your Rating</h3>
              </div>
              <p className="text-xl font-bold text-indigo-600">{getScore()}</p>
            </div>
            
            {statsSent && (
              <div className="flex items-center justify-center gap-1 text-green-600 mb-4">
                <Check className="h-4 w-4" />
                <span className="text-sm">Your score has been recorded</span>
              </div>
            )}
            
            <Button
              onClick={resetGame}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              Play Again
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default WinModal;
