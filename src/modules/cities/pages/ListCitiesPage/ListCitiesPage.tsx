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
import { INITIAL_CITIES_API_ARG } from "./constants";
import { useDebounce } from "@/modules/common/hooks";
import { CitiesRoutesList, CityTableColums } from "@/modules/cities";
import { City, useGetAllCitiesQuery } from "@/services/cities";

const { Title } = Typography;

export const ListCitiesPage = () => {
  document.title = "Ecommerce - Cities";

  const [citiesApiArgs, setCitiesApiArgs] = useState(INITIAL_CITIES_API_ARG);

  const debouncedSearchQuery = useDebounce<string | undefined>(
    citiesApiArgs.search,
    500
  );

  const { data: getAllCitiesData, isFetching } = useGetAllCitiesQuery({
    ...citiesApiArgs,
    search: debouncedSearchQuery,
  });

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<City> | SorterResult<City>[]
  ) => {
    const { column } = sorter as SorterResult<City>;

    setCitiesApiArgs({
      ...citiesApiArgs,
      page: pagination.current,
      perPage: pagination.pageSize,
      sortBy: column?.key as string,
    });
  };

  return (
    <>
      <Title level={1}>Cities</Title>
      <Card style={{ background: "#fff" }}>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Col span={6}>
            <Input
              id="search"
              placeholder="Search"
              onChange={(e) =>
                setCitiesApiArgs({
                  ...citiesApiArgs,
                  page: 1,
                  search: e.target.value,
                })
              }
            />
          </Col>
          <Col span={4}>
            <Link to={CitiesRoutesList.CREATE_CITY}>
              <Button
                size="middle"
                shape="round"
                type="primary"
                style={{ float: "right" }}
                icon={<PlusOutlined />}
              >
                New city
              </Button>
            </Link>
          </Col>
        </Row>

        <Table
          loading={isFetching}
          rowKey={(record) => record.id}
          dataSource={getAllCitiesData?.data}
          pagination={{
            current: citiesApiArgs.page,
            pageSize: citiesApiArgs.perPage,
            total: getAllCitiesData?.meta?.total,
          }}
          columns={CityTableColums}
          onChange={handleTableChange}
        />
      </Card>
    </>
  );
};
