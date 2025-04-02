import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import React from "react";
import { Comment } from "../types";

interface Props {
  comment: Comment;
}

const LikeButton: React.FC<Props> = ({ comment }) => {
  const handleLike = (id: number) => {
    if (comment.liked) {
      console.log(`${id} unlike`);
    } else {
      console.log("like");
    }
  };
  return (
    <Space>
      {comment.liked ? (
        <LikeFilled
          onClick={() => handleLike(comment.id)}
          style={{ color: "#f5222d" }}
        />
      ) : (
        <LikeOutlined onClick={() => handleLike(comment.id)} />
      )}
      <Typography.Text style={{ color: "gray" }}>
        {comment.like}
      </Typography.Text>
    </Space>
  );
};

export default LikeButton;
