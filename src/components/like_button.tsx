import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import React from "react";
import { useParams } from "react-router";
import { useCancelLikeComment, useLikeComment } from "../hook/comment";
import { Comment } from "../types";

interface Props {
  comment: Comment;
}

interface Params extends Record<string, string | undefined> {
  bookId: string;
}

const LikeButton: React.FC<Props> = ({ comment }) => {
  const { bookId } = useParams<Params>();
  const likeMutation = useLikeComment();
  const cancelLikeMutation = useCancelLikeComment();

  const handleLike = () => {
    if (bookId) {
      if (comment.liked) {
        cancelLikeMutation.mutate({
          commentId: comment.id.toString(),
          bookId,
        });
      } else {
        likeMutation.mutate({ commentId: comment.id.toString(), bookId });
      }
    }
  };
  return (
    <Space>
      {comment.liked ? (
        <LikeFilled onClick={handleLike} style={{ color: "#f5222d" }} />
      ) : (
        <LikeOutlined onClick={handleLike} />
      )}
      <Typography.Text style={{ color: "gray" }}>
        {comment.like}
      </Typography.Text>
    </Space>
  );
};

export default LikeButton;
