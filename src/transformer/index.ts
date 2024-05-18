import { Logger } from "@maticnetwork/chain-indexer-framework/logger";
import { BlockProducerError } from "@maticnetwork/chain-indexer-framework/errors/block_producer_error";
import startTransforming from "./transaction_transformer.js";
import { TransactionMapper } from "./mappers/transaction_mapper.js";
import dotenv from 'dotenv';
import path from "path";

dotenv.config();

try {
    startTransforming(
        {
            "bootstrap.servers": process.env.KAFKA_SERVER ?? "localhost:9092",
            "group.id": "transformer",
            "security.protocol": "plaintext",
            "message.max.bytes": 26214400,
            "fetch.message.max.bytes": 26214400,
            coders: {
                fileName: "block",
                packageName: "blockpackage",
                messageType: "Block"
            },
            topic: process.env.BLOCKS_TOPIC_NAME ?? "blocks",
        },
        {
            topic: process.env.TRANSFORMED_TOPIC_NAME ?? "transformed",
            "bootstrap.servers": process.env.KAFKA_SERVER ?? "localhost:9092",
            "security.protocol": "plaintext",
            "message.max.bytes": 26214400,
            coder: {
                fileName: "basic_tx",
                packageName: "basictransactionpackage",
                messageType: "BasicTransactionBlock",
                fileDirectory: path.resolve("dist", "./transformer/schemas/")
            }
        },
        new TransactionMapper()
    );
} catch (e) {
    Logger.error(BlockProducerError.createUnknown(e));
}