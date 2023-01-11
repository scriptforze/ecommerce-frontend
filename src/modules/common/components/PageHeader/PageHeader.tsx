import { BookOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Row, Typography } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { PageHeaderProps } from "./types";

const { Title } = Typography;
const { Item: BreadcrumbItem } = Breadcrumb;

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  breadCrumbItems = [],
}) => {
  return (
    <Row justify="space-between">
      <Col span={12}>
        <Title level={1}>{title}</Title>
      </Col>
      <Col
        span={12}
        style={{
          display: "flex",
          alignItems: "end",
          marginBottom: "19px",
          justifyContent: "end",
        }}
      >
        <Breadcrumb>
          {breadCrumbItems.map((item) => {
            const { title: breadCrumbTitle, link } = item;
            if (link) {
              return (
                <BreadcrumbItem key={`${breadCrumbTitle}-link`}>
                  <Link to={link}>
                    <BookOutlined style={{ marginRight: "5px" }} />
                    <span>{breadCrumbTitle}</span>
                  </Link>
                </BreadcrumbItem>
              );
            }
            return (
              <BreadcrumbItem key={breadCrumbTitle}>
                {breadCrumbTitle}
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
      </Col>
    </Row>
  );
};
