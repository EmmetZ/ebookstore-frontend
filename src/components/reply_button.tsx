import { CommentOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import React from "react";

interface Props {
  reply: boolean;
  onClick: () => void;
}

const ReplyButton: React.FC<Props> = ({ reply, onClick }) => {
  return (
    <Space>
      <CommentOutlined />
      <Typography.Text
        style={{ color: "gray", cursor: "pointer" }}
        onClick={onClick}
      >
        {reply ? "取消回复" : "回复"}
      </Typography.Text>
    </Space>
  );
};

export default ReplyButton;
