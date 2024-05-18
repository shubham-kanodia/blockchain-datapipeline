import { DeserialisedMessage } from "@maticnetwork/chain-indexer-framework/interfaces/deserialised_kafka_message";
import { consume } from "@maticnetwork/chain-indexer-framework/kafka/consumer/consume";

import dotenv from 'dotenv';
import path from "path";

dotenv.config()


async function startConsuming(): Promise<void> {
    try {
        consume({
            "metadata.broker.list": process.env.KAFKA_SERVER ?? "localhost:9092",
            "group.id": "consumer",
            "security.protocol": "plaintext",
            topic: process.env.TRANSFORMED_TOPIC_NAME ?? "transformed",
            coders: {
                fileName: "basic_tx",
                packageName: "basictransactionpackage",
                messageType: "BasicTransactionBlock",
                fileDirectory: path.resolve("dist", "./transformer/schemas")
            },
            type: 'synchronous'
        }, {
            next: async (message: DeserialisedMessage) => {
                console.log(message);
            },
            error(err: Error) {
                console.error('something wrong occurred: ' + err);
            },
            closed: () => {
                throw new Error("Consumer stopped");
            },
        });
    } catch (error) {
        console.log(`Consumer instance is exiting due to error: ${error}`);
        process.exit(1);

    }
}

startConsuming();