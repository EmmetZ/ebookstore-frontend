import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import useMessage from "antd/es/message/useMessage";
import React from "react";
import { useParams } from "react-router";
import useCommentContext from "../context/comment";
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
  const { refresh } = useCommentContext();
  const likeMutation = useLikeComment();
  const cancelLikeMutation = useCancelLikeComment();
  const [messageApi, contextHolder] = useMessage();

  const handleLike = () => {
    if (bookId) {
      if (comment.liked) {
        cancelLikeMutation.mutate(
          {
            commentId: comment.id.toString(),
          },
          {
            onSuccess: (data) => {
              if (!data.ok) {
                messageApi.error(data.message);
              } else {
                refresh();
              }
            },
          },
        );
      } else {
        likeMutation.mutate(
          { commentId: comment.id.toString() },
          {
            onSuccess: (data) => {
              if (!data.ok) {
                messageApi.error(data.message);
              } else {
                refresh();
              }
            },
          },
        );
      }
    }
  };
  return (
    <Space>
      {contextHolder}
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
