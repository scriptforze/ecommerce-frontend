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
import { useDebounce, useLangTranslation } from "@/modules/common/hooks";
import { CountriesRoutesList, CountryTableColums } from "@/modules/countries";
import {
  Country,
  DeleteCountryApiResponse,
  useDeleteCountryMutation,
  useGetAllCountriesQuery,
} from "@/services/countries";
import { pushNotification } from "@/modules/common/helpers";
import { GeneralStatuses } from "@/modules/common/constants";

export const ListCountriesPage = () => {
  const { translate } = useLangTranslation();
  const { Title } = Typography;
  document.title = `Ecommerce - ${translate("menu.zones.countries")}`;

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
      title: `${translate("zones.list.country")} ${data?.status?.name === GeneralStatuses.DISABLED
          ? translate("common.deleted")
          : translate("common.restored")
        }`,
      message: `${translate("zones.list.country")} ${data?.status?.name === GeneralStatuses.DISABLED
          ? translate("common.deleted")
          : translate("common.restored")
        } ${translate("common.successfully")}`,
    });
  };

  const handleDelete = (recordId: number) => {
    deleteCountry({ country: recordId, include: "status" })
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
      <Title level={1}>{translate("menu.zones.countries")}</Title>
      <Card style={{ background: "#fff" }}>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Col span={6}>
            <Input
              id="search"
              placeholder={translate("common.search")}
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
                {translate("zones.list.create")}
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
