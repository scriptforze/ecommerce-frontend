import { BookOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { CategoriesRoutesList, StoreCategoryForm } from "@/modules/categories";

const { Title } = Typography;
const { Item: BreadcrumbItem } = Breadcrumb;

export const CreateCategoryPage = () => {
  document.title = "Ecommerce - New category";

  return (
    <>
      <Row justify="space-between">
        <Col span={12}>
          <Title level={1}>New category</Title>
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
            marginBottom: "19px",
          }}
        >
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to={CategoriesRoutesList.CATEGORIES}>
                <BookOutlined style={{ marginRight: "5px" }} />
                <span>Categories</span>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>New category</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>

      <Card style={{ background: "#fff" }}>
        <StoreCategoryForm />
      </Card>
    </>
  );
};
