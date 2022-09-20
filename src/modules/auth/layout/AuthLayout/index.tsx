import { Card, Col, Layout, Typography } from "antd";
import { StyledRow } from "./styled";
import { AuthLayoutType } from "./types";

const { Content } = Layout;
const { Title } = Typography;

export const AuthLayout = ({ children, title }: AuthLayoutType) => {
  return (
    <Layout>
      <Content>
        <StyledRow justify="center" align="middle">
          <Col xs={20} sm={20} md={20} lg={8}>
            <Card>
              <Title level={2}>{title}</Title>
              {children}
            </Card>
          </Col>
        </StyledRow>
      </Content>
    </Layout>
  );
};
