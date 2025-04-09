import { Empty, List, Space, Typography } from "antd";
import React from "react";
import { Comment, ListResponse } from "../types";
import CommentInput from "./comment_input";
import CommentListItem from "./comment_item";

interface Props {
  comments: ListResponse<Comment>;
}

const CommentList: React.FC<Props> = ({ comments }) => {
  const count = comments.items.length;

  return (
    <Space style={{ marginTop: "24px", width: "100%" }} direction="vertical">
      <Typography.Title level={3}>评论 ({count})</Typography.Title>
      <CommentInput />
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
