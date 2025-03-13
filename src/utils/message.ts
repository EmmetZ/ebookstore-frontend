import { MessageInstance } from "antd/es/message/interface";
import { Response } from "../types";

const handleResponse = async (
  resp: Response<any>,
  messageApi: MessageInstance,
  onSuccess?: () => void | Promise<void>,
  onError?: () => void | Promise<void>
) => {
  const msg = resp.message;
  if (!resp.ok) {
    messageApi.error(msg, 3);
    onError?.();
    return;
  }
  await messageApi.success(msg, 0.5);
  onSuccess?.();
};

export default handleResponse;
