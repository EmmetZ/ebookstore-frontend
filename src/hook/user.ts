import { useMutation, useQuery } from "@tanstack/react-query";
import { MessageInstance } from "antd/es/message/interface";
import { useNavigate } from "react-router";
import { getMe, login, logout } from "../service/user";
import handleResponse from "../utils/message";

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
      messageApi.error(`登录失败! ${error.message}`, 3);
      console.log(error);
    },
  });
  return mutation;
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });
};
