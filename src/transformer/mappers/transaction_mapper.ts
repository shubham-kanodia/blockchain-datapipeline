import { ITransaction } from "@maticnetwork/chain-indexer-framework/interfaces/transaction";
import { IMapper } from "@maticnetwork/chain-indexer-framework/interfaces/mapper";
import IBasicTx from "../interfaces/basic_tx.js";
import Long from "long";


export class TransactionMapper implements IMapper<ITransaction, IBasicTx> {
    map(transaction: ITransaction): IBasicTx[] {
        let tx: IBasicTx = {
            transactionIndex: transaction.transactionIndex as Long,
            transactionHash: transaction.hash,
            senderAddress: transaction.from as string,
            receiverAddress: transaction.to as string
        };

        return [tx];
    }
}