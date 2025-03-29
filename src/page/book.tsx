import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Image, Row } from "antd";
import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import BookInfoCard from "../components/book_info_card";
import PriceCard from "../components/price_card";
import { useBook } from "../hook/book";
import { useComment } from "../hook/comment";

interface Params extends Record<string, string | undefined> {
  bookId: string;
}

const BookPage: React.FC = () => {
  const { bookId } = useParams<Params>();
  const { data: book, isPending, error } = useBook(bookId!);
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const sort = searchParams.get("sort") || "createdTime";
  const pageIndex = Number(searchParams.get("pageIndex")) || 1;
  const { data: comments } = useComment(bookId!, pageIndex, sort);

  if (isPending || error) {
    return null;
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1360px",
        margin: " 0 auto",
      }}
    >
      <Button
        style={{
          margin: "12px 12px 24px 12px",
        }}
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/")}
      >
        返回主页面
      </Button>
      <Row gutter={[24, 16]}>
        <Col span={8}>
          <Image src={book.cover} preview={false} />
        </Col>
        <Col span={16}>
          <BookInfoCard book={book} commentNum={comments?.total} />
          <PriceCard book={book} />
        </Col>
      </Row>
    </div>
  );
};

export default BookPage;
