import { List, Typography } from "antd";
import React, { useState } from "react";
import AdminBookItem from "../components/admin_book_item";
import { useBooks } from "../hook/book";

const AdminPage: React.FC = () => {
  const [tag, setTag] = useState("");
  const [keyword, setKeyword] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
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
      <List
        style={{ margin: "0 20px"}}
        dataSource={data.items}
        renderItem={(book) => <AdminBookItem key={book.id} book={book} />}
      />
    </>
  );
};

export default AdminPage;
