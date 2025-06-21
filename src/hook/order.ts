import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "../service/client";
import {
  Address,
  BookStatistic,
  ListResponse,
  Order,
  Response,
  Role,
} from "../types";
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
  type: Role,
  keyword: string,
  page: number,
  pageSize: number,
  startDate?: string,
  endDate?: string,
) => {
  const endpoint = type === Role.ADMIN ? "/order" : "/user/order";
  const queryKey = type === Role.ADMIN ? ["orders"] : ["user", "orders"];
  return useData<ListResponse<Order>>(queryKey, endpoint, {
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

export const useStatistics = (startDate?: string, endDate?: string) => {
  return useData<BookStatistic[]>(["statistics"], "/user/order/statistics", {
    requestConfig: {
      params: {
        start: startDate,
        end: endDate,
      },
    },
  });
};
