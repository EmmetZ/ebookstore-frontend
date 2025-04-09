import { CommentOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import React from "react";
import { Comment } from "../types";

interface Props {
  comment: Comment;
}

const ReplyButton: React.FC<Props> = ({ comment }) => {
  return (
    <Space>
      <CommentOutlined />
      <Typography.Text
        style={{ color: "gray", cursor: "pointer" }}
        onClick={() => console.log("Reply to comme", comment.id)}
      >
        回复
      </Typography.Text>
    </Space>
  );
};

export default ReplyButton;
