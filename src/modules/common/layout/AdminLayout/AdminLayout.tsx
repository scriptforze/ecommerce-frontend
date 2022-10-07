import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Layout, Menu } from "antd";
import { InitialAuthState, logout, setUser } from "@/modules/auth";
import { useGetAuthUserQuery } from "@/services/auth";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Logo from "@/assets/images/Logo.png";
import {
  StyledLogo,
  StyledMenuFoldOutlined,
  StyledMenuUnfoldOutlined,
} from "./styled";
import { menuTitles } from "./menuTitles";

const { Header, Sider, Content } = Layout;

export const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, user } = useAppSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);

  const {
    data: getAuthUserData,
    error: getAuthUserError,
    isLoading,
  } = useGetAuthUserQuery(undefined, { skip: !token && !!user });

  const isFetching = useMemo(() => isLoading, [isLoading]);

  useEffect(() => {
    if (getAuthUserData) {
      dispatch(setUser({ user: getAuthUserData.data } as InitialAuthState));
    }
  }, [getAuthUserData]);

  useEffect(() => {
    if (getAuthUserError) {
      dispatch(logout());
    }
  }, [getAuthUserError]);

  if (isFetching) {
    return <strong>cargando...</strong>;
  }

  const onMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <StyledLogo>
          {!collapsed ? <img src={Logo} alt="Logo" /> : <strong>Logo</strong>}
        </StyledLogo>
        <Menu
          style={{ height: "100vh" }}
          theme="light"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          onClick={onMenuClick}
          items={menuTitles}
        />
      </Sider>
      <Layout style={{ background: "#fff" }}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {collapsed ? (
            <StyledMenuUnfoldOutlined
              onClick={() => setCollapsed(!collapsed)}
            />
          ) : (
            <StyledMenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
          )}
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: "#f8f8f8",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
