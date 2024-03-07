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
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import {
  DeleteUserApiResponse,
  useDeleteUserMutation,
  useGetAllUserQuery,
  User,
} from "@/services/users";
import { useDebounce, useLangTranslation } from "@/modules/common/hooks";
import { INITIAL_USERS_API_ARG } from "./constants";
import { UsersTableColumns } from "@/modules/users";
import { UsersRoutesList } from "../../routes/constants";
import { GeneralStatuses } from "@/modules/common/constants";
import { pushNotification } from "@/modules/common/helpers";

export const ListUsersPage = () => {
  const { Title } = Typography;
  const { translate, lang } = useLangTranslation();
  document.title = `Ecommerce - ${translate("users.list.title")}`;
  const [usersApiArgs, setUsersApiArgs] = useState(INITIAL_USERS_API_ARG);

  const debouncedSearchQuery = useDebounce<string | undefined>(
    usersApiArgs.search,
    500
  );

  const [deleteUser, { isLoading: isDeleteUserLoading }] =
    useDeleteUserMutation();

  const { data: users, isFetching } = useGetAllUserQuery({
    lang,
    ...usersApiArgs,
    search: debouncedSearchQuery,
  });

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<User> | SorterResult<User>[]
  ) => {
    const { column } = sorter as SorterResult<User>;

    setUsersApiArgs({
      ...usersApiArgs,
      page: pagination.current,
      perPage: pagination.pageSize,
      sortBy: column?.key as string,
    });
  };

  const onSuccessDelete = ({ data }: DeleteUserApiResponse) => {
    const deletedTitle = translate("users.list.messages.success.delete.title");
    const deletedMessage = translate("users.list.messages.success.delete.msg");

    const restoredTitle = translate(
      "users.list.messages.success.restore.title"
    );
    const restoredMessage = translate(
      "users.list.messages.success.restore.msg"
    );

    const title =
      data?.status?.name === GeneralStatuses.ENABLED
        ? restoredTitle
        : deletedTitle;

    const message =
      data?.status?.name === GeneralStatuses.ENABLED
        ? restoredMessage
        : deletedMessage;

    pushNotification({ type: "success", title, message });
  };

  const handleDelete = (recordId: number) => {
    deleteUser({ user: recordId, include: "status" })
      .unwrap()
      .then(onSuccessDelete);
  };
  const UsersColumns = UsersTableColumns({ handleDelete, isDeleteUserLoading });

  return (
    <>
      <Title level={1}>{translate("users.list.title")}</Title>
      <Card style={{ background: "#fff" }}>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Col span={6}>
            <Input
              id="search"
              autoComplete="off"
              placeholder={translate("users.list.search")}
              onChange={(e) =>
                setUsersApiArgs({
                  ...usersApiArgs,
                  page: 1,
                  search: e.target.value,
                })
              }
            />
          </Col>
          <Col span={4}>
            <Link to={UsersRoutesList.CREATE_USER}>
              <Button
                shape="round"
                size="middle"
                type="primary"
                icon={<PlusOutlined />}
                style={{ float: "right" }}
              >
                {translate("users.list.create")}
              </Button>
            </Link>
          </Col>
        </Row>

        <Table
          loading={isFetching}
          columns={UsersColumns}
          onChange={handleTableChange}
          rowKey={(record) => record.id}
          dataSource={users?.data}
          pagination={{
            current: usersApiArgs.page,
            pageSize: usersApiArgs.perPage,
            total: 21,
          }}
        />
      </Card>
    </>
  );
};
