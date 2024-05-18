import Long from "long";

export default interface IBasicTx {
    transactionIndex: Long,
    transactionHash: string,
    senderAddress: string,
    receiverAddress: string
}