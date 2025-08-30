"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { StateType } from "@/providers/token-form";
import {
  createFeeReceiver,
  createFeeSignature,
  createFeeTransaction,
  FEE_IN_SOL,
} from "./solana-utils";
import { validateBalance } from "./wallet-utils";
import { createToken } from "@/server/create-token";

export const useTokenCreation = () => {
  const { connection } = useConnection();
  const { publicKey: userPublicKey, sendTransaction } = useWallet();

  const payFees = async (metadata: StateType, onConfirm?: () => void) => {
    try {
      if (!userPublicKey) {
        throw new Error("Wallet not connected");
      }

      const feeAmount = FEE_IN_SOL * LAMPORTS_PER_SOL;
      const feeReceiver = createFeeReceiver();

      await validateBalance({ feeAmount, userPublicKey, connection });

      const feeTransaction = await createFeeTransaction({
        userPublicKey,
        feeReceiver,
        feeAmount,
        connection,
      });

      const feeSignature = await createFeeSignature({
        feeTransaction,
        sendTransaction,
        connection,
      });

      onConfirm?.();

      const token = await createToken({
        userPublicKeyStr: userPublicKey.toString(),
        metadata,
        feeSignature,
      });

      if (!token) {
        throw new Error("Token creation failed");
      }

      return {
        mintAddress: token.mintAddress,
        tokenAccountAddress: token.accountAddress,
        signature: token.signature,
        feeSignature,
      };
    } catch (error) {
      console.error("Error paying fees:", error);
    }
  };

  return { payFees };
};
