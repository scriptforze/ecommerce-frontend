import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { SideBarContent, Layout, NavBar } from "@/modules/common/components";
import { InitialAuthState, logout, setUser } from "@/modules/auth";
import { useGetAuthUserQuery } from "@/services/auth";
import { useAppDispatch, useAppSelector } from "../hooks";

const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const { token, user } = useAppSelector((state) => state.auth);

  const {
    data: getAuthUserData,
    error: getAuthUserError,
    isLoading,
  } = useGetAuthUserQuery(undefined, { skip: !token && !!user });

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

  if (isLoading) {
    return <strong>cargando...</strong>;
  }

  return (
    <Layout>
      <NavBar />
      <SideBarContent>
        <Outlet />
      </SideBarContent>
    </Layout>
  );
};

export default AdminLayout;
