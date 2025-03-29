import { useMutation, useQueryClient } from "@tanstack/react-query";
import { put } from "../service/client";
import { CartItem, Response } from "../types";
import { MessageInstance } from "antd/es/message/interface";
import { useData } from "./data";

export const useAddToCart = (messageApi: MessageInstance) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookId: number) =>
      put<Response<null>>(`/cart`, undefined, { params: { bookId } }),
    onSuccess: () => {
      messageApi.success("成功加入购物车");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      messageApi.error(`加入购物车失败: ${error.message}`);
    },
  });
};

export const useCart = () => {
  return useData<CartItem[]>(["cart"], "/cart");
};
