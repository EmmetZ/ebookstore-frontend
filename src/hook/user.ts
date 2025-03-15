import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageInstance } from "antd/es/message/interface";
import { useNavigate } from "react-router";
import { login, logout, updateIntro } from "../service/user";
import { IntroFormValue, OtherUser, Response, User } from "../types";
import handleResponse from "../utils/message";
import { useData } from "./data";

export const useLogin = (messageApi: MessageInstance) => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (resp) => {
      await handleResponse(resp, messageApi, () => navigate(-1));
    },
    onError: async (error) => {
      messageApi.error(`登录失败! ${error.message}`, 3);
      console.log(error);
    },
  });
  return mutation;
};

export const useLogout = (messageApi: MessageInstance) => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: async (resp) => {
      await handleResponse(resp, messageApi, () => navigate("/login"));
    },
    onError: async (error) => {
      messageApi.error(`登出失败! ${error.message}`, 3);
      console.log(error);
    },
  });
  return mutation;
};

export const useMe = () => {
  return useData<User>(["me"], "/user/me");
};

export const useUpdateIntro = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Response<null>,
    Error,
    IntroFormValue,
    { previousUser: User | undefined }
  >({
    mutationFn: updateIntro,
    onMutate: async ({ introduction }) => {
      await queryClient.cancelQueries({ queryKey: ["me"] });
      const previousUser = queryClient.getQueryData<User>(["me"]);

      queryClient.setQueriesData<User>({ queryKey: ["me"] }, (old) =>
        old ? ({ ...old, introduction } as User) : old,
      );

      return { previousUser };
    },
    onError: async (_, __, context) => {
      queryClient.setQueryData<User>(["me"], context?.previousUser);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export const useUser = (id: string) => {
  return useData<OtherUser>(["user", id], `/user/${id}`);
};
