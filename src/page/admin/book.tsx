import { PlusCircleOutlined } from "@ant-design/icons";
import { FloatButton, List, Pagination, Tooltip, Typography } from "antd";
import React, { useState } from "react";
import { useSearchParams } from "react-router";
import AdminBookItem from "../../components/admin_book_item";
import BookEditDrawer from "../../components/book_edit_drawer";
import SearchBar from "../../components/search_bar";
import { useBooks, useTag } from "../../hook/book";
import { TagsContext } from "../../context/tags";

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
  const [open, setOpenEdit] = useState(false);
  const { data: tags } = useTag();

  if (isPending || error || !tags) {
    return null;
  }

  return (
    <TagsContext.Provider value={{ tags }}>
      <Typography.Title level={3} style={{ margin: "0 0 20px 0" }}>
        图书列表
      </Typography.Title>
      <SearchBar pageSize={pageSize} tags={tags} />
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
      <Tooltip title="添加图书">
        <FloatButton
          onClick={() => setOpenEdit(true)}
          icon={<PlusCircleOutlined />}
          type="primary"
          style={{ insetInlineEnd: 48 }}
        />
      </Tooltip>
      <BookEditDrawer
        type="add"
        open={open}
        setOpen={setOpenEdit}
      />
    </TagsContext.Provider>
  );
};

export default AdminPage;
