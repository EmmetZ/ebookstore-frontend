import { Empty, List, Space, Typography } from "antd";
import React, { useState } from "react";
import { Comment, ListResponse } from "../types";
import CommentInput from "./comment_input";
import CommentListItem from "./comment_item";
import useMessage from "antd/es/message/useMessage";
import { useParams, Params } from "react-router";
import { usePostComment } from "../hook/comment";

interface Props {
  comments: ListResponse<Comment>;
}

const CommentList: React.FC<Props> = ({ comments }) => {
  const { bookId } = useParams<Params>();
  const [messageApi, contextHolder] = useMessage();
  const post = usePostComment();
  const [comment, setComment] = useState<string>("");

  const count = comments.items.length;
  const handlePost = () => {
    if (bookId) {
      post.mutate(
        { id: bookId, comment: comment },
        {
          onSuccess: () => messageApi.success("评论成功"),
          onError: () => messageApi.error("评论失败"),
        },
      );
    }
  };

  return (
    <Space style={{ marginTop: "24px", width: "100%" }} direction="vertical">
      {contextHolder}
      <Typography.Title level={3}>评论 ({count})</Typography.Title>
      <CommentInput
        comment={comment}
        post={handlePost}
        setComment={(s) => setComment(s)}
      />
      {comments.items.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无评论" />
      ) : (
        <List
          size="large"
          itemLayout="vertical"
          dataSource={comments.items}
          renderItem={(comment) => (
            <CommentListItem key={comment.id} comment={comment} />
          )}
        />
      )}
    </Space>
  );
};

export default CommentList;
