FROM maven:3.9.8-openjdk-22 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:22-jdk-slim

WORKDIR /app
COPY --from=build /app/target/App1-0.0.1-SNAPSHOT.jar /app/App1-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java", "-jar", "/app/App1-0.0.1-SNAPSHOT.jar"]