import { Button, Flex, Input } from "antd";
import React from "react";

interface Props {
  comment: string;
  setComment: (comment: string) => void;
  post: () => void;
  placeholder?: string;
}

const { TextArea } = Input;

const CommentInput: React.FC<Props> = ({
  comment,
  setComment,
  placeholder,
  post,
}) => {
  const handlePost = () => {
    post();
    setComment("");
  };
  return (
    <>
      <TextArea
        placeholder={placeholder || "请输入评论..."}
        autoSize={{ minRows: 3, maxRows: 5 }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Flex justify="end" style={{ marginTop: "12px" }}>
        <Button
          type="primary"
          onClick={handlePost}
          disabled={comment.length === 0}
        >
          发布
        </Button>
      </Flex>
    </>
  );
};

export default CommentInput;
