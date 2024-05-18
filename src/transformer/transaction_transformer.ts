
import { ITransformedBlock } from "@maticnetwork/chain-indexer-framework/interfaces/transformed_block";
import { ITransaction } from "@maticnetwork/chain-indexer-framework/interfaces/transaction";
import { IBlock } from "@maticnetwork/chain-indexer-framework/interfaces/block";
import { Logger } from "@maticnetwork/chain-indexer-framework/logger";
import { IConsumerConfig } from "@maticnetwork/chain-indexer-framework/interfaces/consumer_config";
import { IProducerConfig } from "@maticnetwork/chain-indexer-framework/interfaces/producer_config";
import { transform } from "@maticnetwork/chain-indexer-framework/data_transformation/transform";
import IMaticTransferTx from "./interfaces/basic_tx.js";
import { TransactionMapper } from "./mappers/transaction_mapper.js";
import IBasicTx from "./interfaces/basic_tx.js";


export default async function startTransforming(
    consumerConfig: IConsumerConfig,
    producerConfig: IProducerConfig,
    transactionMapper: TransactionMapper
): Promise<void> {
    try {
        transform<IBlock, IMaticTransferTx>({
            consumerConfig,
            producerConfig,
            type: 'asynchronous'
        }, {
            transform: async (block: IBlock): Promise<ITransformedBlock<IBasicTx>> => {
                let transactions: IBasicTx[] = [];

                block.transactions.forEach((transaction: ITransaction) => {
                    transactions = transactions.concat(transactionMapper.map(transaction));
                });

                return {
                    blockNumber: block.number,
                    timestamp: block.timestamp,
                    data: transactions
                };
            },
            error(err: Error) {
                console.error('something wrong occurred: ' + err);
            },
        })
    } catch (error) {
        Logger.error(`Transformer instance is exiting due to error: ${error}`);
        process.exit(1);

    }
}
