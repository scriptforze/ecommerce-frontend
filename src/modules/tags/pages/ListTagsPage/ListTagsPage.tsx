import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Table,
  TablePaginationConfig,
  Typography,
} from "antd";
import { useState } from "react";
import { SorterResult, FilterValue } from "antd/lib/table/interface";
import { Link } from "react-router-dom";
import { INITIAL_TAGS_API_ARG } from "./constants";
import { useDebounce } from "@/modules/common/hooks";
import { TagsRoutesList, TagTableColums } from "@/modules/tags";
import { Tag, useGetAllTagsQuery } from "@/services/tags";

const { Title } = Typography;

export const ListTagsPage = () => {
  document.title = "Ecommerce - Tags";

  const [tagsApiArgs, setTagsApiArgs] = useState(INITIAL_TAGS_API_ARG);

  const debouncedSearchQuery = useDebounce<string | undefined>(
    tagsApiArgs.search,
    500
  );

  const { data: getAllTagsData, isFetching } = useGetAllTagsQuery({
    ...tagsApiArgs,
    search: debouncedSearchQuery,
  });

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<Tag> | SorterResult<Tag>[]
  ) => {
    const { column } = sorter as SorterResult<Tag>;

    setTagsApiArgs({
      ...tagsApiArgs,
      page: pagination.current,
      perPage: pagination.pageSize,
      sortBy: column?.key as string,
    });
  };

  return (
    <>
      <Title level={1}>Tags</Title>
      <Card style={{ background: "#fff" }}>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Col span={6}>
            <Input
              id="search"
              placeholder="Search"
              onChange={(e) =>
                setTagsApiArgs({
                  ...tagsApiArgs,
                  page: 1,
                  search: e.target.value,
                })
              }
            />
          </Col>
          <Col span={4}>
            <Link to={TagsRoutesList.CREATE_TAGS}>
              <Button
                style={{ float: "right" }}
                type="primary"
                shape="round"
                icon={<PlusOutlined />}
                size="middle"
              >
                New tag
              </Button>
            </Link>
          </Col>
        </Row>

        <Table
          loading={isFetching}
          rowKey={(record) => record.id}
          dataSource={getAllTagsData?.data}
          pagination={{
            current: tagsApiArgs.page,
            pageSize: tagsApiArgs.perPage,
            total: getAllTagsData?.meta?.total,
          }}
          columns={TagTableColums}
          onChange={handleTableChange}
        />
      </Card>
    </>
  );
};
