import { BlockPollerProducer } from "@maticnetwork/chain-indexer-framework/block_producers/block_polling_producer";
import * as dotenv from 'dotenv';

dotenv.config();

const producer = new BlockPollerProducer({
    startBlock: parseInt(process.env.START_BLOCK as string),
    rpcWsEndpoints: [process.env.ENDPOINT as string],
    topic: process.env.BLOCKS_TOPIC_NAME as string,
    blockPollingTimeout: 120000,
    maxReOrgDepth: 96,
    maxRetries: 5,
    mongoUrl: process.env.MONGO_URL as string,
    "bootstrap.servers": process.env.KAFKA_URL as string,
    "security.protocol": "plaintext"
})

producer.on("blockProducer.fatalError", (error) => {
    console.error(`Block producer exited. ${error.message}`);
    process.exit(1);
});

producer.start().catch((error) => {
    console.error(error);
});
