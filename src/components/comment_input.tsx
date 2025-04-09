import { Button, Flex, Input } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router";
import { usePostComment } from "../hook/comment";
import useMessage from "antd/es/message/useMessage";

interface Params extends Record<string, string | undefined> {
  bookId: string;
}

const { TextArea } = Input;

const CommentInput: React.FC = () => {
  const { bookId } = useParams<Params>();
  const [messageApi, contextHolder] = useMessage();
  const post = usePostComment();
  const [comment, setComment] = useState<string>("");

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
    <>
      {contextHolder}
      <TextArea
        placeholder="请输入评论内容"
        autoSize={{ minRows: 3, maxRows: 5 }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Flex justify="end" style={{ marginTop: "12px" }}>
        <Button
          type="primary"
          onClick={() => handlePost()}
          disabled={comment.length === 0}
        >
          发布
        </Button>
      </Flex>
    </>
  );
};

export default CommentInput;
