# ── Build stage: Maven builds the Angular app (via frontend-maven-plugin) and the Spring Boot JAR ──
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY frontend ./frontend
COPY backend ./backend
RUN mvn -f backend/pom.xml package -DskipTests

# ── Runtime stage ──
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/backend/target/rajatravels.jar app.jar
# H2 database file lives here; mount a volume to persist booking inquiries across restarts
VOLUME /app/data
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
