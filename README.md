# Raja Travels

Website for Raja Travels — AP Tourism Authorized Agent in Rajahmundry. Premium bus rentals, Papikondalu boat tourism, Maredumilli eco tours, and Haritha Resort bookings.

## Architecture

| Project | Stack | Purpose |
|---|---|---|
| `frontend/` | Angular 21 + Tailwind CSS 4 | Single-page marketing site with booking form |
| `backend/` | Java 21 + Spring Boot 3 + H2 | REST API for site content and booking inquiries; serves the built frontend |

The backend exposes:

- `GET /api/business` — business info, phone numbers, bus types, stats
- `GET /api/services`, `/api/destinations`, `/api/packages`, `/api/testimonials`, `/api/faqs`, `/api/resorts` — site content (seeded into the database on first run)
- `POST /api/inquiries` — stores booking inquiries submitted from the website

Booking inquiries are saved to the database, and the customer is also handed off to WhatsApp with a prefilled message (same flow as before).

## Build and run (single JAR)

Requirements: Java 21 and Maven. Node is downloaded automatically by the Maven build.

```bash
mvn -f backend/pom.xml package
java -jar backend/target/rajatravels.jar
```

The full website is then served at http://localhost:8080.

The H2 database file is created at `./data/rajatravels.mv.db` (relative to where you run the JAR). Back this file up to keep booking inquiries. To use MySQL/Postgres instead, change the `spring.datasource.*` properties in `backend/src/main/resources/application.properties` and add the driver dependency.

## Run with Docker

```bash
docker build -t rajatravels .
docker run -p 8080:8080 -v rajatravels-data:/app/data rajatravels
```

## Development

Run backend and frontend separately with hot reload:

```bash
# Terminal 1 — API on :8080
mvn -f backend/pom.xml spring-boot:run

# Terminal 2 — Angular dev server on :4200 (proxies /api to :8080)
cd frontend && npm install && npm start
```

## Hosting

Any host that runs Java 21 or Docker works (a small VPS, Railway, Render, AWS, etc.):

1. Build the JAR (or the Docker image) as above.
2. Run it on the server with port 8080 exposed (put Nginx/Caddy or the platform's load balancer in front for HTTPS on your domain).
3. Persist the `data/` directory so booking inquiries survive restarts.
