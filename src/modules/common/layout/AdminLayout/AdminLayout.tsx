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
import { useMenuTitles } from "./useMenuTitles";
import { useLangTranslation } from "@/modules/common/hooks";

const { Header, Sider, Content } = Layout;

export const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLangTranslation();
  const { token, user } = useAppSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const menuTitles = useMenuTitles();

  const {
    data: getAuthUserData,
    error: getAuthUserError,
    isLoading,
  } = useGetAuthUserQuery({ lang }, { skip: !token && !!user });

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
    const fistKey = key.split("/")[1];

    navigate(`/${fistKey}`);
  };

  return (
    <Layout hasSider>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <StyledLogo>
          {!collapsed ? <img src={Logo} alt="Logo" /> : <strong>Logo</strong>}
        </StyledLogo>
        <Menu
          style={{ height: "calc(100vh - 64px)" }}
          theme="light"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          onClick={onMenuClick}
          items={menuTitles}
        />
      </Sider>
      <Layout
        style={{
          background: "#fff",
          marginLeft: collapsed ? 79 : 200,
          transition: "margin-left 0.3s",
        }}
      >
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            position: "fixed",
            zIndex: 1100,
            width: "100%",
          }}
        >
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
            marginTop: "64px",
            position: "relative",
            background: "#f8f8f8",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
