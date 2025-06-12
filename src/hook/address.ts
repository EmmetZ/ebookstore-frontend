import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAddress, deleteAddress } from "../service/user";
import { Address, AddressFormValue, Response } from "../types";
import { useData } from "./data";

interface HandleAddress {
  type: "delete" | "add";
  body: AddressFormValue | number;
}

interface TContext {
  previousAddress: Address[] | undefined;
}

export const useAddress = () => {
  return useData<Address[]>(["address"], "/user/me/addresses");
};

export const useHandleAddress = () => {
  const queryClient = useQueryClient();

  const handleDelete = async (id: number) => {
    await queryClient.cancelQueries({ queryKey: ["address"] });
    const previousAddress = queryClient.getQueryData<Address[]>(["address"]);

    queryClient.setQueriesData<Address[]>({ queryKey: ["address"] }, (old) =>
      old ? old.filter((address) => address.id !== id) : [],
    );

    return { previousAddress };
  };

  const handleAdd = async (address: AddressFormValue) => {
    await queryClient.cancelQueries({ queryKey: ["address"] });
    const previousAddress = queryClient.getQueryData<Address[]>(["address"]);

    queryClient.setQueriesData<Address[]>({ queryKey: ["address"] }, (old) =>
      old
        ? [...old, { ...address, id: old.length + 1 }]
        : [{ ...address, id: 0 }],
    );

    return { previousAddress };
  };

  return useMutation<Response<null>, Error, HandleAddress, TContext>({
    mutationFn: ({ type, body }) => {
      if (type === "delete" && typeof body === "number") {
        return deleteAddress(body);
      }
      if (type === "add" && typeof body === "object") {
        return addAddress(body);
      }
      throw new Error("Invalid type");
    },
    onMutate: async ({ type, body }) => {
      if (type === "delete" && typeof body === "number") {
        return handleDelete(body);
      }
      if (type === "add" && typeof body === "object") {
        return handleAdd(body);
      }
    },
    onSuccess: () => {},
    onError: async (_, __, context) => {
      queryClient.setQueryData<Address[]>(
        ["address"],
        context?.previousAddress,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });
};
