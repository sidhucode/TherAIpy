# TherAIpy Installation Guide

## Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- FFmpeg (for audio conversion)

## Quick Start (After Git Clone)

### 1. Install Dependencies

```bash
# Install Node packages for Next.js backend
npm install

# Install Node packages for Vite frontend
cd UI-PagesTUFF
npm install
cd ..

# Install Python dependencies
pip3 install vosk
```

### 2. Download Vosk Model

```bash
# The model should already be in the repo, but if missing:
cd models
python3 download_vosk_model.py
cd ..
```

### 3. Install FFmpeg (if not installed)

**macOS:**
```bash
brew install ffmpeg
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install ffmpeg
```

**Windows:**
Download from https://ffmpeg.org/download.html

### 4. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` and add your API key:

```
# Required for AI chat responses
GROQ_API_KEY=gsk_YOUR_KEY_HERE
```

To get a Groq API key:
1. Go to https://console.groq.com/keys
2. Sign up for free account
3. Create new API key
4. Copy and paste into `.env`

### 5. Run the Application

```bash
# This runs both frontend and backend
bash run-dev.sh
```

Or run them separately:

```bash
# Terminal 1: Backend (Next.js)
npm run dev

# Terminal 2: Frontend (Vite)
cd UI-PagesTUFF
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:8080
- **Demo Page**: http://localhost:8080/demo
- **Backend API**: http://localhost:3000

## Project Structure

```
TherAIpy/
├── app/                    # Next.js backend
│   ├── api/               # API routes
│   │   ├── stt/          # Speech-to-Text (Vosk)
│   │   ├── chat/         # AI Chat (Groq)
│   │   └── tts/          # Text-to-Speech
│   └── components/        # React components
├── UI-PagesTUFF/          # Vite frontend
│   └── src/
│       ├── pages/        # React pages
│       └── components/   # UI components
├── models/                # Vosk STT model
│   └── vosk-model-small-en-us-0.15/
├── python/                # Python scripts
│   ├── stt_engine.py     # Vosk STT engine
│   └── stt_vosk_api.py   # API wrapper
└── run-dev.sh            # Development script

```

## Features Status

| Feature | Status | Technology |
|---------|--------|------------|
| Speech-to-Text | ✅ Working | Vosk (local, no API) |
| AI Chat | ✅ Working | Groq API (Llama 3.3) |
| Text-to-Speech | ⚠️ Needs setup | Multiple options |
| Avatar | ⚠️ Not configured | D-ID/HeyGen |

## Troubleshooting

### "No module named 'vosk'"
```bash
pip3 install vosk
```

### "ffmpeg: command not found"
Install FFmpeg for your OS (see step 3)

### "Failed to transcribe audio"
Check if Vosk model exists:
```bash
ls models/vosk-model-small-en-us-0.15/
```
If missing, run the download script.

### "Failed to generate response" 
1. Check if GROQ_API_KEY is in `.env`
2. Verify the key is correct
3. Check console for specific error

### Port already in use
Kill existing processes:
```bash
# Find processes
lsof -i :3000
lsof -i :8080

# Kill them
kill -9 <PID>
```

## API Keys

### Required (for full functionality):
- **GROQ_API_KEY**: For AI chat responses
  - Get free at https://console.groq.com/keys
  - No credit card required
  - 30 requests/minute free tier

### Optional:
- **ELEVENLABS_API_KEY**: For premium TTS
- **D_ID_API_KEY**: For avatar generation

## Testing the Setup

1. Go to http://localhost:8080/demo
2. Click the microphone button
3. Say "Hello, I'm feeling anxious"
4. You should see:
   - ✅ Your speech transcribed (Vosk)
   - ✅ AI therapy response (Groq)
   - ⚠️ Voice response (if TTS configured)

## Deployment Notes

**IMPORTANT**: Before deploying:
1. Remove any API keys from `.env.example`
2. Set environment variables in your hosting platform
3. Never commit `.env` file to Git

## Support

For issues, check:
- Console logs in browser (F12)
- Terminal output from `run-dev.sh`
- API response in Network tab