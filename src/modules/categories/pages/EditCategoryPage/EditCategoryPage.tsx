import { Breadcrumb, Card, Col, Row, Typography } from "antd";
import { Link, useParams } from "react-router-dom";
import { BookOutlined } from "@ant-design/icons";
import { CategoriesRoutesList, EditCategoryForm } from "@/modules/categories";
import { useGetCategoryByIdQuery } from "@/services/categories";
import { NotFound } from "@/modules/common/components";

const { Title } = Typography;
const { Item: BreadcrumbItem } = Breadcrumb;

export const EditCategoryPage = () => {
  document.title = "Ecommerce - Edit category";

  const { id } = useParams();
  const categoryId = parseInt(id!, 10);

  const {
    data: getCategoryByIdData,
    isError,
    isFetching,
  } = useGetCategoryByIdQuery({
    category: categoryId,
    include: "image",
  });

  if (isFetching) {
    return <strong>cargando...</strong>;
  }

  if (isError) {
    return <NotFound />;
  }

  return (
    <>
      <Row justify="space-between">
        <Col span={12}>
          <Title level={1}>Edit category</Title>
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
            <BreadcrumbItem>
              <Link to={`${CategoriesRoutesList.CATEGORIES}/${categoryId}`}>
                <span>{categoryId}</span>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>Edit category</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>

      <Card style={{ background: "#fff" }}>
        <EditCategoryForm category={getCategoryByIdData!.data!} />
      </Card>
    </>
  );
};
