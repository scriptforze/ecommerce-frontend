import { Outlet } from "react-router-dom";
import { SideBarContent, Layout, NavBar } from "@/modules/common/components";

const AdminLayout = () => {
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
