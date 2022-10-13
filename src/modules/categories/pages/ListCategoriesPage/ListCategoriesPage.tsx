import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Table, Typography } from "antd";
import { useState } from "react";
import { useGetAllCategoriesQuery } from "@/services/categories";
import { columns, INITIAL_CATEGORIES_API_ARG } from "./constants";

const { Title } = Typography;

export const ListCategoriesPage = () => {
  const [categoriesApiArgs, setCategoriesApiArgs] = useState(
    INITIAL_CATEGORIES_API_ARG
  );

  const { data: getAllCategoriesData, isLoading } =
    useGetAllCategoriesQuery(categoriesApiArgs);

  return (
    <>
      <Title level={1}>Categorías</Title>
      <Card style={{ background: "#fff" }}>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Col span={6}>
            <Input
              id="search"
              placeholder="Search"
              onChange={(e) =>
                setCategoriesApiArgs({
                  ...categoriesApiArgs,
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
              Nueva categoría
            </Button>
          </Col>
        </Row>

        <Table
          loading={isLoading}
          rowKey={(record) => record.id}
          dataSource={getAllCategoriesData?.data}
          columns={columns}
        />
      </Card>
    </>
  );
};
