import { List, Typography } from "antd";
import React from "react";
import { Comment } from "../types";
import UserAvatar from "./avatar";
import LikeButton from "./like_button";
import ReplyButton from "./reply_button";

interface Props {
  comment: Comment;
}

const CommentListItem: React.FC<Props> = ({ comment }) => {
  const postTime = new Date(comment.createdAt);

  return (
    <List.Item
      actions={[
        <LikeButton comment={comment} />,
        <ReplyButton comment={comment} />,
      ]}
      extra={
        <Typography.Text
          style={{
            fontSize: "12px",
            color: "gray",
          }}
        >
          {postTime.toLocaleDateString("zh-CN").replace(/\//g, "-") +
            " " +
            postTime.toLocaleTimeString("zh-CN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
        </Typography.Text>
      }
    >
      <List.Item.Meta
        avatar={<UserAvatar src={comment.avatar} />}
        title={comment.username}
      />
      {comment.content}
    </List.Item>
  );
};

export default CommentListItem;
