FROM maven:3.9.4 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:22-jdk-slim

WORKDIR /app
COPY --from=build /app/target/App1-0.0.1-SNAPSHOT.jar /app/App1-0.0.1-SNAPSHOT.jar
COPY chrome-driver/ /app/chrome-driver/

# RUN apt-get install -y google-chrome-stable
RUN apt-get update && apt-get install -y wget gnupg2 && \
    wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> \
    /etc/apt/sources.list.d/google-chrome.list' && \
    apt update && apt-get install -y google-chrome-stable && \
    rm -rf /var/lib/apt/lists/*

ENV CHROME_BIN=/usr/bin/google-chrome \
    CHROME_DRIVER=/app/chrome-driver/chromedriver

EXPOSE 8000
ENTRYPOINT ["java", "-jar", "/app/App1-0.0.1-SNAPSHOT.jar"]