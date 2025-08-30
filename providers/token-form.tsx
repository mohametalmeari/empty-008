import { useTokenCreation } from "@/lib/actions";
import { createContext, ReactNode, useContext, useState } from "react";

export type StateType = {
  title: string;
  symbol: string;
  description: string;
  supply: number;
  decimals: number;
  logo: File | null;

  website?: string;
  twitter?: string;
  discord?: string;

  index: number;
};

type ResultType = {
  mintAddress: string;
  tokenAccountAddress: string;
  signature: string;
  feeSignature: string;
};
interface Props extends StateType {
  setValue: (newState: Partial<StateType>) => void;
  handleBack: () => void;
  handleNext: () => void;
  submitToken: (
    onWalletConfirm?: () => void
  ) => Promise<ResultType | undefined>;
  resetForm: () => void;
  result?: ResultType | null;
  skip: {
    reset: () => void;
    execute: () => void;
  };
}

const InitialState: StateType = {
  title: "",
  symbol: "",
  description: "",
  supply: 10 ** 9,
  decimals: 6,
  logo: null,
  index: 0,
};

export const TokenFormContext = createContext<Props>({
  ...InitialState,
  setValue: () => {},
  handleBack: () => {},
  handleNext: () => {},
  submitToken: async () => undefined,
  resetForm: () => {},
  skip: {
    reset: () => {},
    execute: () => {},
  },
});

export const TokenFormProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<StateType>(InitialState);
  const [result, setResult] = useState<ResultType | null>(null);
  const [skipped, setSkipped] = useState<boolean>(false);

  const setValue = (newState: Partial<StateType>) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const handleBack = () => {
    setState((prevState) => ({
      ...prevState,
      index: Math.max(prevState.index - 1, 0),
    }));
  };

  const handleNext = () => {
    setState((prevState) => ({
      ...prevState,
      index: Math.min(prevState.index + 1, 4),
    }));
  };

  const { payFees } = useTokenCreation();

  const submitToken = async (onWalletConfirm?: () => void) => {
    try {
      setResult(null);
      const result = await payFees(state, onWalletConfirm);
      if (!result) {
        throw new Error("Token creation failed");
      }
      setResult(result);
      return result;
    } catch (error) {
      console.error("Token creation failed:", error);
      return undefined;
    }
  };

  const resetForm = () => {
    setState(InitialState);
    setResult(null);
  };

  const skip = {
    reset: () => {
      setSkipped(false);
      setState((prevState) => ({
        ...prevState,
        index: 0,
      }));
    },
    execute: () => {
      if (skipped) return;
      setSkipped(true);
      setState((prevState) => ({
        ...prevState,
        index: 1,
      }));
    },
  };

  return (
    <TokenFormContext.Provider
      value={{
        ...state,
        setValue,
        handleBack,
        handleNext,
        submitToken,
        resetForm,
        result,
        skip,
      }}
    >
      {children}
    </TokenFormContext.Provider>
  );
};

export const useTokenForm = () => {
  const context = useContext(TokenFormContext);
  if (!context) {
    throw new Error("useTokenForm must be used within a TokenFormProvider");
  }
  return context;
};
