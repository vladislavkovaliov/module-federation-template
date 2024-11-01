import { Provider } from "react-redux";
import { store } from "./store";

export interface IStoreProviderProps {
  children: any;
}

export const StoreProvider = ({ children }: IStoreProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};
