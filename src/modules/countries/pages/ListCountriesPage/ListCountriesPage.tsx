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
import { INITIAL_COUNTRIES_API_ARG } from "./constants";
import { useDebounce } from "@/modules/common/hooks";
import { CountriesRoutesList, CountryTableColums } from "@/modules/countries";
import {
  Country,
  DeleteCountryApiResponse,
  useDeleteCountryMutation,
  useGetAllCountriesQuery,
} from "@/services/countries";
import { pushNotification } from "@/modules/common/helpers";
import { GeneralStatuses } from "@/modules/common/constants";

const { Title } = Typography;

export const ListCountriesPage = () => {
  document.title = "Ecommerce - Countries";

  const [countriesApiArgs, setCountriesApiArgs] = useState(
    INITIAL_COUNTRIES_API_ARG
  );

  const debouncedSearchQuery = useDebounce<string | undefined>(
    countriesApiArgs.search,
    500
  );

  const [deleteCountry, { isLoading: isDeleteCountryLoading }] =
    useDeleteCountryMutation();

  const { data: getAllCountriesData, isFetching } = useGetAllCountriesQuery({
    ...countriesApiArgs,
    search: debouncedSearchQuery,
  });

  const onSuccessDelete = ({ data }: DeleteCountryApiResponse) => {
    pushNotification({
      type: "success",
      title: `Country ${
        data?.status?.name === GeneralStatuses.DISABLED ? "deleted" : "restored"
      }`,
      message: `Country ${
        data?.status?.name === GeneralStatuses.DISABLED ? "deleted" : "restored"
      } successfully`,
    });
  };

  const handleDelete = (record: Country) => {
    deleteCountry({ country: record.id, include: "status" })
      .unwrap()
      .then(onSuccessDelete);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<Country> | SorterResult<Country>[]
  ) => {
    const { column } = sorter as SorterResult<Country>;

    setCountriesApiArgs({
      ...countriesApiArgs,
      page: pagination.current,
      perPage: pagination.pageSize,
      sortBy: column?.key as string,
    });
  };

  const CountriesColumns = CountryTableColums({
    handleDelete,
    isDeleteCountryLoading,
  });

  return (
    <>
      <Title level={1}>Countries</Title>
      <Card style={{ background: "#fff" }}>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Col span={6}>
            <Input
              id="search"
              placeholder="Search"
              onChange={(e) =>
                setCountriesApiArgs({
                  ...countriesApiArgs,
                  page: 1,
                  search: e.target.value,
                })
              }
            />
          </Col>
          <Col span={4}>
            <Link to={CountriesRoutesList.CREATE_COUNTRY}>
              <Button
                style={{ float: "right" }}
                type="primary"
                shape="round"
                icon={<PlusOutlined />}
                size="middle"
              >
                New country
              </Button>
            </Link>
          </Col>
        </Row>

        <Table
          loading={isFetching}
          columns={CountriesColumns}
          onChange={handleTableChange}
          rowKey={(record) => record.id}
          dataSource={getAllCountriesData?.data}
          pagination={{
            current: countriesApiArgs.page,
            pageSize: countriesApiArgs.perPage,
            total: getAllCountriesData?.meta?.total,
          }}
        />
      </Card>
    </>
  );
};
