import React from "react";

export interface ILocalStore {
  destroy(): void;
}

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  const [store] = React.useState(() => creator());

  React.useEffect(() => {
    return () => {
      store.destroy();
    };
  }, [store]);

  return store;
};
