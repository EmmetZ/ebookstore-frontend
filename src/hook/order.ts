import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "../service/client";
import { Address, ListResponse, Order, Response } from "../types";
import { useData } from "./data";

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

export const useOrders = (
  keyword: string,
  page: number,
  pageSize: number,
  startDate?: string,
  endDate?: string,
) => {
  return useData<ListResponse<Order>>(["orders"], "/order", {
    requestConfig: {
      params: {
        keyword,
        pageIndex: page,
        pageSize,
        start: startDate,
        end: endDate,
      },
    },
  });
};
