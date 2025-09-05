# TherAIpy - Consolidated Setup

## Architecture Overview

The TherAIpy application now consists of two parts:

1. **Frontend (UI-PagesTUFF)**: A Vite + React application with a beautiful landing page and routing
   - Runs on port 8080
   - Located in `/UI-PagesTUFF` directory
   - Uses React Router for navigation

2. **Backend (Next.js API)**: Handles all API routes for STT, TTS, Chat, and Avatar
   - Runs on port 3000
   - Located in root directory
   - Provides `/api/*` endpoints

## How It Works

- The main landing page is served from UI-PagesTUFF (Vite)
- When users click "Try TherAIpy Now" or "Start a Session", they're routed to `/demo`
- The demo page contains the full VoiceInterface implementation
- API calls from the frontend are proxied to the Next.js backend through Vite's proxy configuration

## Running the Application

### Quick Start
```bash
# Run both frontend and backend
bash run-dev.sh
```

This will:
- Start Next.js backend on http://localhost:3000
- Start Vite frontend on http://localhost:8080
- Frontend automatically proxies API calls to backend

### Manual Start (if needed)
```bash
# Terminal 1: Start Next.js backend
npm run dev

# Terminal 2: Start Vite frontend
cd UI-PagesTUFF
npm run dev
```

## Pages

1. **Landing Page** (`/`): Beautiful marketing page with:
   - Hero section with "Start a Session" button
   - Features showcase
   - Demo section with "Try TherAIpy Now" button
   - Call-to-action sections

2. **Demo Page** (`/demo`): Full TherAIpy experience with:
   - Voice interface (microphone button)
   - Real-time transcription
   - AI chat responses
   - Text-to-speech playback
   - Message history display

## File Structure

```
TherAIpy/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes (STT, TTS, Chat, Avatar)
│   ├── components/           # Original TherAIpy components
│   └── hooks/                # React hooks
├── UI-PagesTUFF/             # Vite frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Index.tsx    # Landing page
│   │   │   └── Demo.tsx     # Demo page with voice interface
│   │   └── components/       # UI components + copied TherAIpy components
│   └── vite.config.ts        # Configured with API proxy
├── run-dev.sh                # Development script to run both servers
└── package.json              # Next.js dependencies
```

## API Endpoints

All API endpoints are handled by Next.js and proxied through Vite:

- `/api/stt` - Speech to Text
- `/api/tts` - Text to Speech
- `/api/chat` - AI Chat
- `/api/avatar` - Avatar generation

## Notes

- The original Next.js app page (`/app/page.tsx`) is still available at http://localhost:3000
- The main user experience is through the Vite frontend at http://localhost:8080
- All privacy features and API integrations remain intact
- The consolidated app maintains the same functionality with an enhanced UI