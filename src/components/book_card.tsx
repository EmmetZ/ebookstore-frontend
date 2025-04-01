import { Card, Flex, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { Book } from "../types";

interface Props {
  book: Book;
}

const BookCard: React.FC<Props> = ({ book }) => {
  const navigate = useNavigate();
  return (
    <Card
      hoverable
      cover={<img src={book.cover} alt={book.title} />}
      onClick={() => navigate(`/book/${book.id}`)}
    >
      <Card.Meta
        title={book.title}
        description={
          <p
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              margin: 0,
            }}
          >
            {book.author}
          </p>
        }
      />
      <Flex justify="end" style={{ marginTop: "10px" }}>
        <Typography.Text strong style={{ fontSize: "1.2em" }}>
          {book.price / 100}元
        </Typography.Text>
      </Flex>
    </Card>
  );
};

export default BookCard;
