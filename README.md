# Number Puzzle Game

A browser-based number puzzle game where players rearrange a shuffled 3x3 grid to match the specific sequence "80135606".

## Game Features

- Interactive 3x3 grid with sliding tile mechanics
- Goal to arrange tiles in the specific order: "80135606"
- Move counter to track progress
- Win detection with congratulatory modal
- Audio effects with mute toggle
- Mobile-responsive design

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Zustand for state management

## Development

To run the project locally:

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to `http://localhost:5000`

## Deployment

This project is set up for Netlify deployment:

1. Connect your GitHub repository to Netlify
2. Netlify will automatically detect the build configuration
3. The site will be built and deployed with each push to the main branch

## Game Instructions

- Click on a tile adjacent to the empty space to move it
- Rearrange the numbers to match the sequence "80135606"
- The empty space should be in the bottom-right corner when finished
- Try to complete the puzzle in as few moves as possible
- Use the Reset button to start over with a new shuffled board