FROM maven:3.9.8-openjdk-22

# ARG JAR_FILE=target/*.jar

# COPY ./target target
# COPY ${JAR_FILE} target/app.jar

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package

FROM openjdk:22-jdk-slim AS build

WORKDIR /app
COPY --from=build /app/target/App1-0.0.1-SNAPSHOT.jar /app/App1-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java", "-jar", "/app/App1-0.0.1-SNAPSHOT.jar"]