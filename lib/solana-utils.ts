import { SendTransactionOptions } from "@solana/wallet-adapter-base";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionSignature,
  VersionedTransaction,
} from "@solana/web3.js";

export const FEE_AMOUNT = Number(process.env.NEXT_PUBLIC_FEE_AMOUNT);
export const FEE_IN_SOL = Number(process.env.NEXT_PUBLIC_ACTUAL_FEE_AMOUNT);
export const FEE_IN_SOL_SERVER = Number(process.env.ACTUAL_FEE_AMOUNT);

export const ENDPOINT =
  process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com";

export const createFeeReceiver = () => {
  const feeReceiverPublicKey = process.env.NEXT_PUBLIC_FEE_RECEIVER_PUBLIC_KEY;
  if (!feeReceiverPublicKey) {
    throw new Error(
      "Fee receiver public key not configured. Contact administrator to add NEXT_PUBLIC_FEE_RECEIVER_PUBLIC_KEY to environment variables."
    );
  }

  return { publicKey: new PublicKey(feeReceiverPublicKey) };
};

interface CreateFeeTransactionParams {
  userPublicKey: PublicKey;
  feeReceiver: { publicKey: PublicKey };
  feeAmount: number;
  connection: Connection;
}

export const createFeeTransaction = async ({
  userPublicKey,
  feeReceiver,
  feeAmount,
  connection,
}: CreateFeeTransactionParams) => {
  const feeTransaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: userPublicKey,
      toPubkey: feeReceiver.publicKey,
      lamports: feeAmount,
    })
  );
  feeTransaction.feePayer = userPublicKey;
  feeTransaction.recentBlockhash = (
    await connection.getLatestBlockhash()
  ).blockhash;
  return feeTransaction;
};

interface CreateFeesSignatureParams {
  feeTransaction: Transaction;
  connection: Connection;
  sendTransaction: (
    transaction: Transaction | VersionedTransaction,
    connection: Connection,
    options?: SendTransactionOptions
  ) => Promise<TransactionSignature>;
}

export const createFeeSignature = async ({
  feeTransaction,
  connection,
  sendTransaction,
}: CreateFeesSignatureParams) => {
  const feeSignature = await sendTransaction(feeTransaction, connection, {
    skipPreflight: false,
    preflightCommitment: "processed",
  });
  await connection.confirmTransaction(
    {
      signature: feeSignature,
      ...(await connection.getLatestBlockhash()),
    },
    "finalized"
  );

  return feeSignature;
};
