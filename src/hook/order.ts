import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "../service/client";
import { Address, Response } from "../types";

interface OrderRequest extends Address {
  itemIds: number[];
}

export const usePlaceOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderRequest: OrderRequest) =>
      post<Response<null>>("/order", orderRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
