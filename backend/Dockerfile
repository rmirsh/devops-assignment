FROM openjdk:22

ARG JAR_FILE=target/*.jar

COPY ./target target
COPY ${JAR_FILE} target/app.jar

ENTRYPOINT ["java","-jar","target/app.jar"]