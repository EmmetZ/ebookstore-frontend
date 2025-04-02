import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface TCartContext {
  sum: number;
  selectedList: number[];
  setSum: Dispatch<SetStateAction<number>>;
  setSelectedList: Dispatch<SetStateAction<number[]>>;
}

export const CartContext = createContext<TCartContext>({} as TCartContext);

export default function useCartContext() {
  return useContext(CartContext);
}
