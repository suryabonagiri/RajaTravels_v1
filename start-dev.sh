#!/usr/bin/env bash
# Start Raja Travels locally:
#   Backend API  -> http://localhost:8080
#   Angular app  -> http://localhost:3000  (proxies /api to :8080)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

need() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Missing required command: $1"
    exit 1
  }
}

need java
need mvn
need npm

if ! java -version 2>&1 | grep -q 'version "21'; then
  echo "Warning: Java 21 is recommended (found: $(java -version 2>&1 | head -1))"
fi

echo "Installing frontend deps (if needed)..."
(cd frontend && npm install --silent)

# Free ports if already in use
fuser -k 8080/tcp 2>/dev/null || true
fuser -k 3000/tcp 2>/dev/null || true
sleep 1

echo "Starting Spring Boot API on :8080..."
mvn -f backend/pom.xml spring-boot:run -DskipTests > /tmp/rajatravels-backend.log 2>&1 &
BACKEND_PID=$!

echo "Waiting for API..."
for i in $(seq 1 60); do
  if curl -sf http://localhost:8080/api/business >/dev/null 2>&1; then
    echo "API ready."
    break
  fi
  if ! kill -0 "$BACKEND_PID" 2>/dev/null; then
    echo "Backend exited early. Log:"
    tail -50 /tmp/rajatravels-backend.log
    exit 1
  fi
  sleep 2
done

echo "Starting Angular on :3000..."
cd frontend
exec npx ng serve --port 3000 --host 0.0.0.0
