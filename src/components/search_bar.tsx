import { FilterOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps, Flex, Input } from "antd";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import { TagContext } from "../context/tag";
import { useTag } from "../hook/book";
import SearchPanel from "./search_panel";

const { Search } = Input;

const SearchBar: React.FC = () => {
  const [activeKey, setActiveKey] = React.useState<string[]>([]);
  const { data: tags } = useTag();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTag, setTag] = React.useState("");

  useEffect(() => {
    const tag = searchParams.get("tag") || "";
    setTag(tag);
  }, []);

  const handleClick = (tag: string) => {
    setTag(tag === selectedTag ? "" : tag);
  };
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: null,
      showArrow: false,
      styles: {
        header: {
          margin: "0px",
          padding: "0px",
        },
        body: {
          margin: "0 0 0",
          padding: "0px",
        },
      },
      children: tags && <SearchPanel tags={tags} />,
    },
  ];
  return (
    <Flex
      style={{
        width: "100%",
      }}
      justify="center"
    >
      <div
        style={{
          minWidth: "40%",
          maxWidth: "100%",
        }}
      >
        <TagContext.Provider value={{ selectedTag, setTag: handleClick }}>
          <Search
            style={{ width: "100%" }}
            suffix={
              <FilterOutlined
                style={{
                  color: activeKey.length > 0 ? "black" : "gray",
                }}
                onClick={() => setActiveKey(activeKey.length ? [] : ["1"])}
              />
            }
            placeholder="请输入关键字"
            onSearch={(value) => {
              setSearchParams({
                keyword: value,
                size: "10",
                page: "0",
                tag: selectedTag,
              });
            }}
          />
          <div
            style={{
              marginTop: "8px",
            }}
          >
            <Collapse
              activeKey={activeKey}
              onChange={(keys) =>
                setActiveKey(typeof keys === "string" ? [keys] : keys)
              }
              ghost
              items={items}
            />
          </div>
        </TagContext.Provider>
      </div>
    </Flex>
  );
};

export default SearchBar;
