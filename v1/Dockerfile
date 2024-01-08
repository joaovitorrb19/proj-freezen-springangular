FROM openjdk:17
VOLUME /tmp

ADD ./target/v1-0.0.1-SNAPSHOT.jar freezen.jar
ENTRYPOINT ["java","-jar","/freezen.jar"]