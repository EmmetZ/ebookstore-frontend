import { Avatar, List } from "antd";
import React from "react";
import { Comment } from "../types";
import LikeButton from "./like_button";

interface Props {
  comment: Comment;
}

const CommentListItem: React.FC<Props> = ({ comment }) => {
  return (
    <List.Item actions={[<LikeButton comment={comment} />]}>
      <List.Item.Meta
        avatar={<Avatar src={comment.avatar} />}
        title={comment.username}
        description={comment.createdAt}
      />
      {comment.content}
    </List.Item>
  );
};

export default CommentListItem;
