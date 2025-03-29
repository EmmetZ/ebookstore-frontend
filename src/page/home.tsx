import { Pagination } from "antd";
import React from "react";
import { useSearchParams } from "react-router";
import BookGrid from "../components/book_grid";
import SearchBar from "../components/search_bar";
import { useBooks } from "../hook/book";

const HomePage: React.FC = () => {
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
    pageSize
  );

  if (isPending || error) {
    return null;
  }

  return (
    <div>
      <SearchBar />
      <BookGrid books={data.items} />
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
    </div>
  );
};

export default HomePage;
