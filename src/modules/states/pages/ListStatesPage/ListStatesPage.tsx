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
import { INITIAL_STATES_API_ARG } from "./constants";
import { useDebounce, useLangTranslation } from "@/modules/common/hooks";
import { StatesRoutesList, StateTableColumns } from "@/modules/states";
import {
  DeleteStateApiResponse,
  State,
  useDeleteStateMutation,
  useGetAllStatesQuery,
} from "@/services/states";
import { pushNotification } from "@/modules/common/helpers";
import { GeneralStatuses } from "@/modules/common/constants";

export const ListStatesPage = () => {
  const { translate } = useLangTranslation();
  const { Title } = Typography;
  document.title = `Ecommerce - ${translate("menu.zones.states")}`;

  const [statesApiArgs, setStatesApiArgs] = useState(INITIAL_STATES_API_ARG);

  const debouncedSearchQuery = useDebounce<string | undefined>(
    statesApiArgs.search,
    500
  );

  const [deleteState, { isLoading: isDeleteStateLoading }] =
    useDeleteStateMutation();

  const { data: getAllStatesData, isFetching } = useGetAllStatesQuery({
    ...statesApiArgs,
    search: debouncedSearchQuery,
  });

  const onSuccessDelete = ({ data }: DeleteStateApiResponse) => {
    pushNotification({
      type: "success",
      title: `${translate("common.columns.status")} ${data?.status?.name === GeneralStatuses.DISABLED
          ? translate("common.deleted")
          : translate("common.restored")
        }`,
      message: `${translate("common.columns.status")} ${data?.status?.name === GeneralStatuses.DISABLED
          ? translate("common.deleted")
          : translate("common.restored")
        } ${translate("common.successfully")}`,
    });
  };

  const handleDelete = (recordId: number) => {
    deleteState({ state: recordId, include: "status" })
      .unwrap()
      .then(onSuccessDelete);
  };

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

  const StatesColumns = StateTableColumns({
    handleDelete,
    isDeleteStateLoading,
  });

  return (
    <>
      <Title level={1}>{translate("menu.zones.states")}</Title>
      <Card style={{ background: "#fff" }}>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Col span={6}>
            <Input
              id="search"
              placeholder={translate("common.search")}
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
            <Link to={StatesRoutesList.CREATE_STATE}>
              <Button
                size="middle"
                shape="round"
                type="primary"
                icon={<PlusOutlined />}
                style={{ float: "right" }}
              >
                {translate("zones.form.createState")}
              </Button>
            </Link>
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
          columns={StatesColumns}
          onChange={handleTableChange}
        />
      </Card>
    </>
  );
};
