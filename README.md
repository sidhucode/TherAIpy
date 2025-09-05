```markdown
# TherAIpy

**TherAIpy** is a therapy and counseling web application with real-time voice interaction, designed to provide AI-powered therapy sessions. The platform emphasizes spoken responses over traditional chat, creating a natural and immersive therapy experience.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Setup & Installation](#setup--installation)
6. [API Endpoints](#api-endpoints)
7. [Usage](#usage)
8. [Future Work](#future-work)
9. [Privacy & Security](#privacy--security)
10. [Contributing](#contributing)
11. [License](#license)

---

## Overview

TherAIpy delivers AI-powered therapy with an **audio-first approach**, offering users the ability to converse naturally with a virtual therapist. Unlike typical GPT wrappers, the platform focuses on generating **spoken responses** while maintaining the flexibility to integrate text-based chat, avatars, and session management.

---

## Features

### ✅ Implemented
- **Text-to-Speech (TTS)**
  - Kokoro 82M parameter model
  - Python TTS engine with automatic model loading
  - 24kHz WAV audio output
  - Direct streaming to browser
  - Automatic cleanup of temporary files (5-minute retention)

- **Speech-to-Text (STT) [Mock]**
  - Audio file uploads supported (webm/opus)
  - Returns transcription with confidence score
  - Ready for integration with Whisper or Google Cloud

- **AI Chat/Therapy [Mock]**
  - CBT-based system prompt
  - Context-aware responses with message history
  - Session management support

- **Voice Interface & Frontend Components**
  - Browser microphone recording with noise suppression & echo cancellation
  - VoiceInterface, MicButton, Captions, PrivacyBanner, Avatar placeholder
  - Real-time audio loop: Record → STT → Chat → TTS → Playback

- **Project Infrastructure**
  - Organized directory structure (`python/`, `temp/`, `app/`)
  - Python virtual environment (3.12.6)
  - Git ignore for audio files
  - Cleanup scripts for maintenance

### ⚠️ Partially Implemented
- Avatar generation API structure (ready for D-ID/HeyGen integration)

### ❌ Not Yet Implemented
- Real STT integration (Whisper/Google Cloud)
- GPT-4 integration for therapy responses
- Real-time avatar video generation
- Advanced streaming, WebSocket communication, session persistence
- User authentication, therapy progress tracking, analytics, multi-language support, emotion detection, voice cloning
- Security: end-to-end encryption, HIPAA compliance, audit logging

---

## Tech Stack

- **Frontend:** Next.js 13.5.3, React 18, TypeScript, TailwindCSS
- **Backend:** Next.js API Routes
- **TTS Engine:** Kokoro (Python 3.12.6)
- **Environment:** macOS, Node.js, Python virtual environment

---

## Project Structure

```

TherAIpy/
├── app/
│   ├── api/
│   │   ├── tts/      # Fully functional
│   │   ├── stt/      # Mock implementation
│   │   ├── chat/     # Mock implementation
│   │   └── avatar/   # Placeholder
├── components/
│   ├── VoiceInterface
│   ├── MicButton
│   ├── Captions
│   ├── Avatar
│   └── PrivacyBanner
├── python/
│   ├── tts\_engine.py
│   └── cleanup.py
├── temp/audio/       # Temporary audio storage
└── .venv/            # Python virtual environment

````

---

## Setup & Installation

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd TherAIpy
````

### 2. Python Environment

```bash
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r python/requirements.txt
```

### 3. Node.js Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

> The first TTS request automatically downloads the Kokoro model (\~300MB).

---

## API Endpoints

| Endpoint           | Description               | Status        |
| ------------------ | ------------------------- | ------------- |
| POST `/api/tts`    | Generate speech from text | ✅ Working     |
| POST `/api/stt`    | Transcribe audio to text  | ⚠️ Mock       |
| POST `/api/chat`   | Generate therapy response | ⚠️ Mock       |
| POST `/api/avatar` | Generate avatar/video     | ❌ Placeholder |

---

## Usage

* Open the web app in a browser
* Use the **MicButton** to record voice
* Audio is sent to STT → Chat → TTS → playback automatically
* Captions display transcription and response text in real time

---

## Future Work

* Integrate **real STT models** (Whisper/Google)
* Integrate **GPT-4 or other LLMs** for therapy responses
* Add **avatar/video generation**
* Real-time streaming via **WebSockets**
* Session persistence, user authentication, progress tracking
* Advanced features: multi-language support, emotion detection, voice customization
* Security: HIPAA compliance, end-to-end encryption, audit logging

---

## Privacy & Security

* Temporary audio files auto-delete (configurable retention)
* No persistent storage of user audio in main directories
* `.gitignore` prevents accidental commit of audio files
* Privacy banner notifies users of data handling

---

## Contributing

* Clone the repository and follow the setup instructions
* Use feature branches for new functionality
* Submit PRs with clear descriptions of changes
* Ensure all audio or sensitive data is excluded from commits

---

## License

This project is **MIT licensed**. See [LICENSE](LICENSE) for details.

```
```
https://github.com/alphacep/vosk-api
