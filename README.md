# EVM Data Pipeline

## Setup

### Kafka Setup

* Launch kafka and zookeeper services

    ```sh
    docker-compose up -d
    ```

* Check the containers are up and running. The below command should give both the containers

    ```sh
    docker ps
    ```

* Open a terminal in kafka container to test out a few commands

    ```sh
    docker exec -it <kafka-container-id> bash
    ```

* Try creating a topic

    ```sh
    kafka-topics --create --topic <topic-name> --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
    ```

* List topics

    ```sh
    kafka-topics --list --bootstrap-server localhost:9092
    ```

* Produce messages

    ```sh
    kafka-console-producer --topic <topic-name> --bootstrap-server localhost:9092
    ```

* Open a new terminal and type in the below command after entering the kafka container terminal. Now whatever you type in the previous terminal and hit enter will be reflected in this terminal

    ```sh
    kafka-console-consumer --topic temp-topic --bootstrap-server localhost:9092 --from-beginning
    ```


### Project Setup

* Install packages

```sh
npm i
```

Note: Make sure you have distutils installed using this command `pip3 install --upgrade setuptools`

## Running the indexer

* Run the producer

```sh
npm run producer
```

* Run the transformer

```sh
npm run transformer
```

* Run the consumer

```sh
npm run consumer
```
