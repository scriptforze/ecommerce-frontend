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
import { INITIAL_STATES_API_ARG } from "./constants";
import { useDebounce } from "@/modules/common/hooks";
import { StateTableColums } from "@/modules/states";
import { State, useGetAllStatesQuery } from "@/services/states";

const { Title } = Typography;

export const ListStatesPage = () => {
  document.title = "Ecommerce - States";

  const [statesApiArgs, setStatesApiArgs] = useState(INITIAL_STATES_API_ARG);

  const debouncedSearchQuery = useDebounce<string | undefined>(
    statesApiArgs.search,
    500
  );

  const { data: getAllStatesData, isFetching } = useGetAllStatesQuery({
    ...statesApiArgs,
    search: debouncedSearchQuery,
  });

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<State> | SorterResult<State>[]
  ) => {
    const { column } = sorter as SorterResult<State>;

    setStatesApiArgs({
      ...statesApiArgs,
      page: pagination.current,
      perPage: pagination.pageSize,
      sortBy: column?.key as string,
    });
  };

  return (
    <>
      <Title level={1}>States</Title>
      <Card style={{ background: "#fff" }}>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Col span={6}>
            <Input
              id="search"
              placeholder="Search"
              onChange={(e) =>
                setStatesApiArgs({
                  ...statesApiArgs,
                  page: 1,
                  search: e.target.value,
                })
              }
            />
          </Col>
          <Col span={4}>
            <Button
              style={{ float: "right" }}
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size="middle"
            >
              New state
            </Button>
          </Col>
        </Row>

        <Table
          loading={isFetching}
          rowKey={(record) => record.id}
          dataSource={getAllStatesData?.data}
          pagination={{
            current: statesApiArgs.page,
            pageSize: statesApiArgs.perPage,
            total: getAllStatesData?.meta?.total,
          }}
          columns={StateTableColums}
          onChange={handleTableChange}
        />
      </Card>
    </>
  );
};
