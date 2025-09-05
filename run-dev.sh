#!/bin/bash

echo "Starting TherAIpy Development Environment..."
echo "=========================================="

# Function to kill processes on exit
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $NEXT_PID $VITE_PID 2>/dev/null
    exit
}

# Set up trap to call cleanup on script exit
trap cleanup INT TERM

# Start Next.js backend (API routes)
echo "Starting Next.js backend on port 3000..."
npm run dev &
NEXT_PID=$!

# Wait a bit for Next.js to start
sleep 3

# Start Vite frontend
echo "Starting Vite frontend on port 8080..."
cd UI-PagesTUFF && npm run dev &
VITE_PID=$!

echo ""
echo "=========================================="
echo "✅ Development servers started!"
echo ""
echo "🌐 Frontend: http://localhost:8080"
echo "🔧 Backend API: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "=========================================="

# Wait for both processes
wait $NEXT_PID $VITE_PID