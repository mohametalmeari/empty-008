import { useState, useEffect, useCallback } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { fetchWalletBalance } from "@/lib/wallet-utils";

type StateType = {
  balance?: number | null;
  loading?: boolean;
  error?: string | null;
};

export const useBalance = () => {
  const [state, setState] = useState<StateType>();

  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const refreshBalance = useCallback(async () => {
    if (publicKey) {
      setState({ balance: null, loading: true, error: null });

      const result = await fetchWalletBalance(connection, publicKey);

      setState({
        balance: result.balance,
        error: result.error,
        loading: false,
      });
    } else {
      setState({
        balance: null,
        error: null,
        loading: false,
      });
    }
  }, [connection, publicKey]);

  useEffect(() => {
    refreshBalance();
  }, [refreshBalance]);

  return {
    ...state,
    publicKey,
    refreshBalance,
  };
};
