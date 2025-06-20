import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageInstance } from "antd/es/message/interface";
import { useNavigate } from "react-router";
import { post } from "../service/client";
import { login, logout, updateIntro } from "../service/user";
import {
  AdminUser,
  IntroFormValue,
  ListResponse,
  OtherUser,
  RegisterBody,
  Response,
  Role,
  User,
  UserConsumption,
  UserStatusBody,
} from "../types";
import handleResponse from "../utils/message";
import { useData } from "./data";

export const useLogin = (messageApi: MessageInstance) => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (resp) => {
      if (resp.data?.role === Role.ADMIN) {
        await handleResponse(resp, messageApi, () => navigate("/admin"));
        return;
      }
      await handleResponse(resp, messageApi, () => navigate("/"));
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
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: async (resp) => {
      queryClient.clear();
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
  return useData<User>(["me"], "/user/me", { retry: 0 });
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

export const useRegister = () => {
  return useMutation<Response<null>, Error, RegisterBody>({
    mutationFn: (body) => post<Response<null>>("/register", body),
  });
};

export const useUsers = (pageIndex: number, pageSize: number, role: string) => {
  return useData<ListResponse<AdminUser>>(["users"], "/users", {
    requestConfig: {
      params: {
        pageIndex,
        pageSize,
        role,
      },
    },
  });
};

export const useBanUser = () => {
  return useMutation<Response<null>, Error, UserStatusBody>({
    mutationFn: (body) => post<Response<null>>("/user/status", body),
  });
};

export const useUsersConsumption = (startDate?: string, endDate?: string) => {
  return useData<UserConsumption[]>(["consumption"], "/users/data", {
    requestConfig: {
      params: {
        start: startDate,
        end: endDate,
      },
    },
  });
};
