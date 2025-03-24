import { useEffect } from "react";
import GameBoard from "./components/GameBoard";
import Instructions from "./components/Instructions";
import WinModal from "./components/WinModal";
import { useNumberPuzzle } from "./lib/stores/useNumberPuzzle";
import { Button } from "./components/ui/button";
import { useAudio } from "./lib/stores/useAudio";
import { VolumeX, Volume2 } from "lucide-react";

function App() {
  const { isWin, resetGame, moveCount } = useNumberPuzzle();
  const { isMuted, toggleMute, setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  // Load audio elements
  useEffect(() => {
    // Background music
    const bgMusic = new Audio("/sounds/background.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    setBackgroundMusic(bgMusic);

    // Movement sound
    const hitSfx = new Audio("/sounds/hit.mp3");
    setHitSound(hitSfx);

    // Success sound
    const successSfx = new Audio("/sounds/success.mp3");
    setSuccessSound(successSfx);

    // Cleanup
    return () => {
      bgMusic.pause();
      hitSfx.pause();
      successSfx.pause();
    };
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col items-center p-4">
      <header className="w-full max-w-md flex justify-between items-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-800">Number Puzzle</h1>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleMute}
            title={isMuted ? "Unmute sounds" : "Mute sounds"}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          <Button onClick={resetGame} variant="outline">
            Reset Game
          </Button>
        </div>
      </header>

      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-gray-700">Moves: {moveCount}</span>
          <span className="font-semibold text-gray-700">
            Goal: <span className="text-indigo-600 font-bold">80135606</span>
          </span>
        </div>
        
        <GameBoard />
      </div>

      <Instructions />

      {isWin && <WinModal />}
    </div>
  );
}

export default App;
