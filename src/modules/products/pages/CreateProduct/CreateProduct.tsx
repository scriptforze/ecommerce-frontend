import { BookOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { ProductsRoutesList } from "../../routes/constants";

const { Title } = Typography;
const { Item: BreadcrumbItem } = Breadcrumb;

export const CreateProduct = () => {
  document.title = "Ecommerce - New Product";
  return (
    <Row justify="space-between">
      <Col span={12}>
        <Title level={1}>New product</Title>
      </Col>
      <Col span={12}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={ProductsRoutesList.PRODUCTS}>
              <BookOutlined style={{ marginRight: "5px" }} />
              <span>Products</span>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>New product</BreadcrumbItem>
        </Breadcrumb>
      </Col>
    </Row>
  );
};
