import { FEE_AMOUNT, FEE_IN_SOL_SERVER } from "@/lib/solana-utils";
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import bs58 from "bs58";

export const validateFeePayment = async (
  connection: Connection,
  feeSignature: string,
  expectedSenderPublicKey: string
) => {
  const feeTransaction = await connection.getTransaction(feeSignature);
  if (!feeTransaction) {
    throw new Error("Fee transaction not found");
  }

  const feeReceiverPublicKey = process.env.NEXT_PUBLIC_FEE_RECEIVER_PUBLIC_KEY;
  if (!feeReceiverPublicKey) {
    throw new Error("Fee receiver public key not configured");
  }

  if (!feeTransaction.meta || feeTransaction.meta.err) {
    throw new Error("Fee transaction failed");
  }

  if (!feeTransaction.blockTime) {
    throw new Error("Transaction timestamp not available");
  }

  const transactionTime = feeTransaction.blockTime;
  const currentTime = Math.floor(Date.now() / 1000);
  const tenMinutesInSeconds = 10 * 60;

  if (currentTime - transactionTime > tenMinutesInSeconds) {
    throw new Error("Fee payment expired. Please make a new payment.");
  }

  const preBalances = feeTransaction.meta.preBalances;
  const postBalances = feeTransaction.meta.postBalances;
  const accountKeys = feeTransaction.transaction.message.accountKeys;

  const receiverIndex = accountKeys.findIndex(
    (key) => key.toString() === feeReceiverPublicKey
  );

  if (receiverIndex === -1) {
    throw new Error("Invalid fee receiver");
  }

  const senderIndex = accountKeys.findIndex(
    (key) => key.toString() === expectedSenderPublicKey
  );

  if (senderIndex === -1) {
    throw new Error("Fee was not paid by the token creator");
  }

  const amountReceived =
    postBalances[receiverIndex] - preBalances[receiverIndex];
  const requiredAmount = FEE_IN_SOL_SERVER * LAMPORTS_PER_SOL;

  if (amountReceived < requiredAmount) {
    throw new Error(
      `Insufficient fee payment. Required: ${FEE_AMOUNT} SOL, Received: ${
        amountReceived / LAMPORTS_PER_SOL
      } SOL`
    );
  }
};

export const createFeePayer = async () => {
  const feePayerPrivateKey = process.env.FEE_PAYER_PRIVATE_KEY;
  if (!feePayerPrivateKey) {
    throw new Error(
      "Fee payer private key not configured. Contact administrator to add FEE_PAYER_PRIVATE_KEY to environment variables."
    );
  }

  try {
    const privateKeyBytes = bs58.decode(feePayerPrivateKey);
    return Keypair.fromSecretKey(privateKeyBytes);
  } catch {
    throw new Error(
      "Invalid fee payer private key format. Expected a valid base58 string. Contact your administrator for the correct key."
    );
  }
};
