import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Image, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import BookInfoCard from "../components/book_info_card";
import CommentList from "../components/comment_list";
import PriceCard from "../components/price_card";
import { useBook } from "../hook/book";
import getComments from "../service/comment";
import { Comment, CommentSort, ListResponse } from "../types";
import { CommentContext } from "../context/comment";

interface Params extends Record<string, string | undefined> {
  bookId: string;
}

const BookPage: React.FC = () => {
  const { bookId } = useParams<Params>();
  const { data: book, isPending, error } = useBook(bookId!);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = (searchParams.get("sort") || "createdTime") as CommentSort;
  const pageIndex = Number(searchParams.get("pageIndex")) || 0;
  const pageSize = Number(searchParams.get("pageSize")) || 5;
  //const { data: comments } = useComment(bookId!, pageIndex, pageSize, sort);

  const [comments, setComments] = useState<ListResponse<Comment>>();
  const getComment = useCallback(async () => {
    const res = await getComments(bookId!, pageIndex, pageSize, sort);
    setComments(res);
  }, [bookId, pageIndex, sort, pageSize]);

  useEffect(() => {
    getComment();
  }, [getComment]);

  const handleSort = (sort: CommentSort) =>
    setSearchParams(
      {
        sort: sort,
        pageIndex: "0",
        pageSize: pageSize.toString(),
      },
      {
        replace: true,
      }
    );

  const handlePageChange = (page: number, pageSize: number) => {
    setSearchParams(
      {
        sort: sort,
        pageIndex: (page - 1).toString(),
        pageSize: pageSize.toString(),
      },
      {
        replace: true,
      }
    );
  };

  if (isPending || error || !comments) {
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
        onClick={() => navigate(-1)}
      >
        返回主页面
      </Button>
      <Row gutter={[24, 16]}>
        <Col span={8}>
          <Image src={book.cover} preview={false} />
        </Col>
        <Col span={16}>
          <BookInfoCard book={book} />
          <PriceCard book={book} />
        </Col>
        <CommentContext.Provider value={{ refresh: getComment }}>
          <CommentList
            comments={comments}
            sort={sort}
            onSortChange={handleSort}
            onPageChange={handlePageChange}
            index={pageIndex}
            size={pageSize}
          />
        </CommentContext.Provider>
      </Row>
    </div>
  );
};

export default BookPage;
