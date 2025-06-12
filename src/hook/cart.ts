import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageInstance } from "antd/es/message/interface";
import { del, put } from "../service/client";
import { CartItem, Response } from "../types";
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

export const useModifyCartItem = (messageApi: MessageInstance) => {
  const queryClient = useQueryClient();
  return useMutation<
    Response<null>,
    Error,
    { id: number; num: number },
    { prevCart: CartItem[] | undefined }
  >({
    mutationFn: ({ id, num }) =>
      put(`/cart/${id}`, undefined, { params: { number: num } }),
    onMutate: ({ id, num }) => {
      const prevCart = queryClient.getQueryData<CartItem[]>(["cart"]);
      queryClient.setQueryData<CartItem[]>(["cart"], (old) => {
        if (!old) return [];
        return old.map((item) =>
          item.id === id ? { ...item, number: num } : item,
        );
      });
      return { prevCart };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error, _, context) => {
      messageApi.error(`修改购物车失败: ${error.message}`);
      queryClient.setQueryData<CartItem[]>(["cart"], context?.prevCart);
    },
  });
};

export const useDeleteCartItem = (messageApi: MessageInstance) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => del<Response<null>>(`/cart/${id}`),
    onSuccess: () => {
      messageApi.success("删除成功");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      messageApi.error(`删除失败: ${error.message}`);
    },
    onSettled: () => {},
  });
};
