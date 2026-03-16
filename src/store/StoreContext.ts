import { enableStaticRendering } from "mobx-react-lite";
import { RootStore } from "./RootStore";

const isServer = typeof window === "undefined";

if (isServer) {
  enableStaticRendering(true);
}

let clientStore: RootStore | undefined;

export const useCreateRootStore = (): RootStore => {
  if (isServer) {
    return new RootStore();
  }

  if (!clientStore) {
    clientStore = new RootStore();
  }

  return clientStore;
};
