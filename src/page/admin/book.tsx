import { List, Pagination, Typography } from "antd";
import React from "react";
import { useSearchParams } from "react-router";
import AdminBookItem from "../../components/admin_book_item";
import SearchBar from "../../components/search_bar";
import { useBooks } from "../../hook/book";

const AdminPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const pageIndex =
    searchParams.get("page") != null ? parseInt(searchParams.get("page")!) : 0;
  const pageSize =
    searchParams.get("pageSize") != null
      ? parseInt(searchParams.get("pageSize")!)
      : 10;
  const tag = searchParams.get("tag") || "";
  const { data, isPending, error } = useBooks(
    keyword,
    tag,
    pageIndex,
    pageSize,
  );

  if (isPending || error) {
    return null;
  }

  return (
    <>
      <Typography.Title level={3} style={{ margin: "0 0 20px 0" }}>
        图书列表
      </Typography.Title>
      <SearchBar pageSize={pageSize} />
      <List
        dataSource={data.items}
        renderItem={(book) => <AdminBookItem key={book.id} book={book} />}
      />
      <Pagination
        align="center"
        showSizeChanger
        current={pageIndex + 1}
        total={pageSize * data.total}
        pageSize={pageSize}
        onChange={(page, pageSize) => {
          setSearchParams({
            keyword,
            tag,
            page: (page - 1).toString(),
            pageSize: pageSize.toString(),
          });
        }}
      />
    </>
  );
};

export default AdminPage;
