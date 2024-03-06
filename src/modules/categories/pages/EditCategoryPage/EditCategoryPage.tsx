import { Breadcrumb, Card, Col, Row, Typography } from "antd";
import { Link, useParams } from "react-router-dom";
import { BookOutlined } from "@ant-design/icons";
import { CategoriesRoutesList, CategoryForm } from "@/modules/categories";
import { useGetCategoryByIdQuery } from "@/services/categories";
import { NotFound } from "@/modules/common/components";
import { useLangTranslation } from "@/modules/common/hooks";

const { Title } = Typography;
const { Item: BreadcrumbItem } = Breadcrumb;

export const EditCategoryPage = () => {
  const { translate } = useLangTranslation();
  document.title = `Ecommerce - ${translate("categories.form.title.update")}`;

  const { id } = useParams();
  const categoryId = parseInt(id!, 10);

  const {
    data: getCategoryByIdData,
    isError,
    isFetching,
  } = useGetCategoryByIdQuery({
    include: "image",
    category: categoryId,
  });

  if (isFetching) {
    return <strong>{`${translate("common.loading")}...`}</strong>;
  }

  if (isError) {
    return <NotFound />;
  }

  return (
    <>
      <Row justify="space-between">
        <Col span={12}>
          <Title level={1}>{translate("categories.form.title.update")}</Title>
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
                <span>{translate("categories.form.title.update")}</span>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to={`${CategoriesRoutesList.CATEGORIES}/${categoryId}`}>
                <span>{categoryId}</span>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              {translate("common.columns.category")}
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>

      <Card style={{ background: "#fff" }}>
        <CategoryForm category={getCategoryByIdData?.data} />
      </Card>
    </>
  );
};
