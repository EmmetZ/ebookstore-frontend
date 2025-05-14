import { Divider, Flex, List, Space, Typography } from "antd";
import useMessage from "antd/es/message/useMessage";
import React, { useState } from "react";
import { useParams } from "react-router";
import useCommentContext from "../context/comment";
import { useReplyPost } from "../hook/comment";
import { Comment } from "../types";
import UserAvatar from "./avatar";
import CommentInput from "./comment_input";
import LikeButton from "./like_button";
import ReplyButton from "./reply_button";

interface Props {
  comment: Comment;
}

interface Params extends Record<string, string | undefined> {
  bookId: string;
}

const CommentListItem: React.FC<Props> = ({ comment }) => {
  const [ready, setReady] = useState(false);
  const [content, setContent] = useState("");
  const [messageApi, contextHolder] = useMessage();
  const { bookId } = useParams<Params>();
  const reply = useReplyPost();
  const { refresh } = useCommentContext();

  const time = new Date(comment.createdAt);
  const postTime =
    time.toLocaleDateString("zh-CN").replace(/\//g, "-") +
    " " +
    time.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleReply = () => {
    if (bookId) {
      reply.mutate(
        { bookId, comment: content, commentId: comment.id.toString() },
        {
          onSuccess: () => {
            messageApi.success("回复成功");
            refresh();
          },
          onError: () => messageApi.error("回复失败"),
        }
      );
    }
  };

  return (
    <List.Item>
      {contextHolder}
      <Flex justify="space-between" align="center">
        <List.Item.Meta
          avatar={<UserAvatar src={comment.avatar} />}
          title={comment.username}
          description={
            <Space direction="vertical" style={{ width: "100%" }}>
              <>
                {comment.reply ? (
                  <Space direction="vertical">
                    <Typography.Text strong>
                      回复 {comment.reply}:
                    </Typography.Text>
                    <Typography.Text>{comment.content}</Typography.Text>
                  </Space>
                ) : (
                  <Typography.Text>{comment.content}</Typography.Text>
                )}
              </>
              <Space>
                <Typography.Text
                  style={{
                    fontSize: "12px",
                    color: "gray",
                  }}
                >
                  {postTime}
                </Typography.Text>
                <Divider type="vertical" />
                <LikeButton comment={comment} />
                <Divider type="vertical" />
                <ReplyButton reply={ready} onClick={() => setReady(!ready)} />
              </Space>
              {ready && (
                <CommentInput
                  comment={content}
                  setComment={(s) => setContent(s)}
                  post={handleReply}
                  placeholder={`回复 ${comment.username}: ...`}
                />
              )}
            </Space>
          }
        />
      </Flex>
    </List.Item>
  );
};

export default CommentListItem;
