# FlashAid

FlashAid is a frontend-only emergency response demo built with React, Vite, Tailwind CSS, Framer Motion, and React Router.

It is designed to simulate the first 60 seconds of an emergency with:

- guided emergency workflows
- voice-based instructions
- inactivity detection
- an emergency broadcast overlay
- volunteer response visualization

## Overview

FlashAid includes three main experiences:

- Landing page with product positioning and feature walkthrough
- Emergency flow with guided response states
- Volunteer page with a polished registration-style interface

The emergency flow supports:

- `idle`
- `type-select`
- `active`
- `broadcast`

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

## Routes

- `/` — landing page
- `/emergency` — emergency workflow
- `/volunteer` — volunteer page

## Core Features

### Emergency Workflow

- One-tap emergency activation
- Emergency type selection:
  - Cardiac Arrest
  - Choking
  - Injury / Bleeding
- Auto-guided emergency steps
- Visual escalation over time
- Reassurance messaging
- CPR rhythm interaction mode

### Audio + Voice

- AudioContext unlocking on user interaction
- Browser speech synthesis guidance
- Safe speech cancellation to prevent overlapping instructions
- Alarm generation using Web Audio API

### Safety + Stability

- Inactivity timer with warning and escalation
- Dead Man’s Broadcast full-screen overlay
- Wake lock support where available
- Error boundary fallback UI
- Route fallback redirect to home

### UI / Demo Experience

- Splash screen
- Premium glass-style interface
- ETA countdown panel
- Fake volunteer responder map
- Demo mode / minimal real mode presentation

## Project Structure

```text
flashaid-v3/
├── public/
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Important Files

- `src/pages/Emergency.jsx` — main emergency state machine
- `src/hooks/useAudioQueue.js` — speech guidance queue
- `src/hooks/useInactivityTimer.js` — inactivity detection
- `src/utils/audioContext.js` — alarm audio utilities
- `src/components/DeadMansBroadcast.jsx` — emergency alert overlay
- `src/data/emergencyProtocols.js` — emergency instructions and protocol data

## Notes

- This project is frontend-only.
- No backend or external APIs are used.
- All emergency logic is local and in-memory.
- This is a demo product and not a substitute for real emergency services.

## Demo Readiness

The app has been structured for demo use with:

- polished navigation
- guided emergency flow
- stable browser-safe audio handling
- production build support

## License

This repository is intended for demo and hackathon use unless your team defines a different license.
