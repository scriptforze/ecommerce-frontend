import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Layout, Menu } from "antd";
import { useTranslation } from "react-i18next";
import { InitialAuthState, logout, setUser } from "@/modules/auth";
import {
  useGetAuthUserQuery,
  useLogoutAuthUserMutation,
} from "@/services/auth";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Logo from "@/assets/images/Logo.png";
import LogoSmall from "@/assets/images/Logo-small.png";
import {
  StyledLogo,
  StyledMenuFoldOutlined,
  StyledMenuUnfoldOutlined,
  Logout,
} from "./styled";
import { useMenuTitles } from "./useMenuTitles";
import { useLangTranslation } from "@/modules/common/hooks";

const { Header, Sider, Content } = Layout;

export const AdminLayout = () => {
  const { i18n } = useTranslation();
  const { translate } = useLangTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLangTranslation();
  const { token, user } = useAppSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const menuTitles = useMenuTitles();
  const languages = {
    es: "es",
    en: "en",
  };

  const [language, setLanguage] = useState(languages.es);
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const {
    data: getAuthUserData,
    error: getAuthUserError,
    isLoading,
  } = useGetAuthUserQuery({ lang }, { skip: !token && !!user });

  const [logOutMutation] = useLogoutAuthUserMutation();

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

  const handleLogout = () => {
    logOutMutation({
      logoutRequest: {
        all: false,
      },
    });
    dispatch(logout());
  };

  if (isFetching) {
    return <strong>{`${translate("common.loading")}...`}</strong>;
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
        <StyledLogo
          className={`logo-container${collapsed ? "--collapsed" : ""}`}
        >
          <img
            src={Logo}
            alt="Logo"
            width="160"
            height="40"
            className={`sidebar-logo${collapsed ? "--hide" : ""}`}
          />
          <img
            width="40"
            height="40"
            src={LogoSmall}
            alt="Logo Collapsed"
            className={`sidebar-logo${!collapsed ? "--hide" : ""}`}
          />
        </StyledLogo>
        <Menu
          style={{ height: "calc(100vh - 80px)" }}
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
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {collapsed ? (
            <StyledMenuUnfoldOutlined
              onClick={() => setCollapsed(!collapsed)}
            />
          ) : (
            <StyledMenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
          )}
          <form>
            <label htmlFor="lang">
              {`${translate("common.language")}: `}
              <select
                name="lang"
                id="lang"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {Object.keys(languages).map((langKey) => (
                  <option
                    value={langKey}
                    key={langKey}
                    onClick={() => i18n.changeLanguage(language)}
                  >
                    {languages[langKey]}
                  </option>
                ))}
              </select>
            </label>
          </form>
          <Logout onClick={handleLogout}>
            <svg
              viewBox="64 64 896 896"
              focusable="true"
              data-icon="user"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
            </svg>
            {translate("common.logout")}
          </Logout>
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
