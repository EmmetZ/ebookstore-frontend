import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Empty, List, Pagination, Space, Typography } from "antd";
import useMessage from "antd/es/message/useMessage";
import React, { useState } from "react";
import { Params, useParams } from "react-router";
import useCommentContext from "../context/comment";
import { usePostComment } from "../hook/comment";
import { Comment, CommentSort, ListResponse } from "../types";
import CommentInput from "./comment_input";
import CommentListItem from "./comment_item";

interface Props {
  comments: ListResponse<Comment>;
  sort: CommentSort;
  index: number;
  size: number;
  onSortChange: (sort: CommentSort) => void;
  onPageChange: (page: number, pageSize: number) => void;
}

const CommentList: React.FC<Props> = ({
  comments,
  sort,
  index,
  size,
  onPageChange,
  onSortChange,
}) => {
  const { bookId } = useParams<Params>();
  const [messageApi, contextHolder] = useMessage();
  const [newComment, setNewComment] = useState<string>("");
  const post = usePostComment();
  const { refresh } = useCommentContext();

  const handlePost = () => {
    if (bookId) {
      post.mutate(
        { id: bookId, comment: newComment },
        {
          onSuccess: () => {
            messageApi.success("评论成功");
            refresh();
          },
          onError: () => messageApi.error("评论失败"),
        }
      );
    }
  };

  return (
    <>
      {comments && (
        <Space
          style={{ marginTop: "24px", width: "100%" }}
          direction="vertical"
        >
          {contextHolder}
          <Typography.Title level={3}>评论</Typography.Title>
          <CommentInput
            comment={newComment}
            post={handlePost}
            setComment={(s) => setNewComment(s)}
          />
          {comments.items.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="暂无评论"
            />
          ) : (
            <>
              <Button
                style={{ marginLeft: "20px" }}
                onClick={() => {
                  if (sort === "createdTime") {
                    onSortChange("like");
                  } else {
                    onSortChange("createdTime");
                  }
                }}
              >
                <UnorderedListOutlined />
                {sort === "createdTime" ? "最新" : "最热"}
              </Button>
              <List
                size="large"
                itemLayout="vertical"
                dataSource={comments.items}
                renderItem={(comment) => (
                  <CommentListItem key={comment.id} comment={comment} />
                )}
                locale={{
                  emptyText: (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description="暂无评论"
                    />
                  ),
                }}
              />
              <Pagination
                style={{ marginLeft: "20px" }}
                size="small"
                total={size * comments.total}
                current={index + 1}
                pageSize={size}
                onChange={onPageChange}
              />
            </>
          )}
        </Space>
      )}
    </>
  );
};

export default CommentList;
