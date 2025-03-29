import { List } from "antd";
import React from "react";
import { Book } from "../types";
import BookCard from "./book_card";

interface Props {
  books: Book[];
}

const BookGrid: React.FC<Props> = ({ books }) => {
  return (
    <List
      style={{
        marginTop: "32px",
      }}
      grid={{ gutter: 16, column: 5 }}
      dataSource={books}
      renderItem={(book) => (
        <List.Item>
          <BookCard key={book.id} book={book} />
        </List.Item>
      )}
    />
  );
};

export default BookGrid;
