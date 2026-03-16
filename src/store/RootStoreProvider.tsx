"use client";

import React from "react";
import { useStrictContext } from "../shared/hooks/useStrictContetxParams";
import { useCreateRootStore } from "./StoreContext";
import { RootStore } from "./RootStore";

type RootStoreContextValue = RootStore;

type RootStoreProviderProps = {
  children: React.ReactNode;
};

const RootStoreContext = React.createContext<RootStoreContextValue | null>(
  null,
);
export const RootStoreProvider: React.FC<RootStoreProviderProps> = ({
  children,
}) => {
  const store = useCreateRootStore();
  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useRootStore = () => {
  return useStrictContext({
    context: RootStoreContext,
    message: "RootStoreContext was not provided",
  });
};
