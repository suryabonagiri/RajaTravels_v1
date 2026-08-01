# Raja Travels

Two projects in this repo:

- `backend/` — Java 21, Spring Boot 3, Maven. REST API (`/api/*`) + H2 file database. Content is seeded by `DataSeeder` on first run. Also serves the built Angular app from the JAR.
- `frontend/` — Angular 21 (standalone components, signals, zoneless) with Tailwind CSS 4. Single-page site; talks to the backend via `/api` (proxied to :8080 in dev via `proxy.conf.json`).

Build the deployable JAR with `mvn -f backend/pom.xml package` (this also builds the frontend). See `README.md` for details.
