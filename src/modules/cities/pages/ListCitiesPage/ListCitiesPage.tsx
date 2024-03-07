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
import { useDebounce, useLangTranslation } from "@/modules/common/hooks";
import { CitiesRoutesList, CityTableColums } from "@/modules/cities";
import {
  City,
  DeleteCityApiResponse,
  useDeleteCityMutation,
  useGetAllCitiesQuery,
} from "@/services/cities";
import { pushNotification } from "@/modules/common/helpers";
import { GeneralStatuses } from "@/modules/common/constants";

const { Title } = Typography;

export const ListCitiesPage = () => {
  const { translate } = useLangTranslation();
  document.title = `Ecommerce - ${translate("menu.zones.cities")}`;

  const [citiesApiArgs, setCitiesApiArgs] = useState(INITIAL_CITIES_API_ARG);

  const debouncedSearchQuery = useDebounce<string | undefined>(
    citiesApiArgs.search,
    500
  );

  const [deleteCity, { isLoading: isDeleteCityLoading }] =
    useDeleteCityMutation();
  const { data: getAllCitiesData, isFetching } = useGetAllCitiesQuery({
    ...citiesApiArgs,
    search: debouncedSearchQuery,
  });

  const onSuccessDelete = ({ data }: DeleteCityApiResponse) => {
    pushNotification({
      type: "success",
      title: `${translate("zones.list.city")}  ${data?.status?.name === GeneralStatuses.DISABLED
          ? translate("common.deleted")
          : translate("common.restored")
        }`,
      message: `${translate("zones.list.city")} ${data?.status?.name === GeneralStatuses.DISABLED
          ? translate("common.deleted")
          : translate("common.restored")
        } ${translate("common.successfully")}`,
    });
  };

  const handleDelete = (recordId: number) => {
    deleteCity({ city: recordId, include: "status" })
      .unwrap()
      .then(onSuccessDelete);
  };

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

  const CitiesColumns = CityTableColums({ isDeleteCityLoading, handleDelete });

  return (
    <>
      <Title level={1}>{translate("menu.zones.cities")}</Title>
      <Card style={{ background: "#fff" }}>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Col span={6}>
            <Input
              id="search"
              placeholder={translate("common.search")}
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
                {translate("zones.form.createCity")}
              </Button>
            </Link>
          </Col>
        </Row>

        <Table
          loading={isFetching}
          columns={CitiesColumns}
          onChange={handleTableChange}
          rowKey={(record) => record.id}
          dataSource={getAllCitiesData?.data}
          pagination={{
            current: citiesApiArgs.page,
            pageSize: citiesApiArgs.perPage,
            total: getAllCitiesData?.meta?.total,
          }}
        />
      </Card>
    </>
  );
};
