FROM maven:3.9.4 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:22-jdk-slim

WORKDIR /app
COPY --from=build /app/target/App1-0.0.1-SNAPSHOT.jar /app/App1-0.0.1-SNAPSHOT.jar
COPY ./chrome-driver/chrome-driver /usr/local/bin/

RUN apt-get install -y google-chrome-stable
ENV CHROME_BIN=/usr/bin/google-chrome \
    CHROME_DRIVER=/usr/local/bin/chromedriver

EXPOSE 8000
ENTRYPOINT ["java", "-jar", "/app/App1-0.0.1-SNAPSHOT.jar"]