# Number Puzzle Game

A browser-based sliding puzzle game where players must rearrange numbers to match the sequence "80135606".

![Number Puzzle Game](client/public/screenshot.png)

## Features

- Interactive 3x3 grid with sliding tile mechanics
- Target sequence "80135606" as the winning condition
- Move counter to track progress
- Score rating based on number of moves
- Sound effects with mute option
- Confetti celebration animation on winning
- Responsive design for all devices
- Serverless functions for future analytics integration

## How to Play

1. Click on a tile adjacent to the empty space to move it
2. Rearrange the numbers to match the sequence "80135606"
3. The empty space should be in the bottom-right corner when finished
4. Try to complete the puzzle in as few moves as possible
5. Use the Reset button to start over with a new shuffled board

## Technology Stack

- React.js with TypeScript for the frontend
- Tailwind CSS for styling
- Framer Motion for animations
- Zustand for state management
- React-Confetti for celebration effects
- Netlify for hosting and serverless functions

## Development

### Prerequisites

- Node.js 18+ and npm 9+

### Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser to `http://localhost:5000`

### Building for Production

```
npm run build
```

The project is configured for easy deployment to Netlify. Connect your repository to Netlify, and it will automatically build and deploy using the configuration in `netlify.toml`.

## License

MIT License