import { Divider, Tag, Typography } from "antd";
import React from "react";
import { Book } from "../types";

interface Props {
  book: Book;
}

const BookInfoCard: React.FC<Props> = ({ book }) => {
  return (
    <>
      <Typography.Title
        level={1}
        style={{
          marginTop: "0",
          marginBottom: "4px",
        }}
      >
        {book.title}
      </Typography.Title>
      <Typography.Text style={{ color: "#595959", fontSize: "1.2em" }}>
        {book.author}
      </Typography.Text>
      <div>
        <span>
          {book.tags.map((tag) => (
            <Tag key={tag.id} className="book-tag">
              {tag.name}
            </Tag>
          ))}
        </span>
        <Divider type="vertical" className="metadata-divider" />
        已售 {book.sales} 本
      </div>
      <Typography.Paragraph
        style={{
          marginTop: "24px",
        }}
      >
        {book.description}
      </Typography.Paragraph>
    </>
  );
};

export default BookInfoCard;
