import { Card, Col, Layout } from "antd";
import { Outlet } from "react-router-dom";
import { StyledRow } from "./styled";

const { Content } = Layout;

export const AuthLayout = () => {
  return (
    <Layout>
      <Content>
        <StyledRow justify="center" align="middle">
          <Col xs={20} sm={20} md={20} lg={8}>
            <Card>
              <Outlet />
            </Card>
          </Col>
        </StyledRow>
      </Content>
    </Layout>
  );
};
