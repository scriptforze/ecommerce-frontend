import { Col, Layout, Row, Space } from "antd";
import { AuthLayoutType } from "./AuthLayoutTypes";

const { Content } = Layout;

export const AuthLayout = ({ children, title }: AuthLayoutType) => {
  return (
    <Layout>
      <Content>
        <Space align="center">
          <Row justify="center" align="bottom">
            <Col span={4}>{children}</Col>
          </Row>
        </Space>
      </Content>
    </Layout>
  );
};
