import { useAppSelector } from "@/modules/common/hooks";

export const DashboardPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  return <div>DashboardPage {user?.name}</div>;
};
