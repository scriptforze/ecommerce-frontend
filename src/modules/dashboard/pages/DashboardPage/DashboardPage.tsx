import { useAppSelector, useLangTranslation } from "@/modules/common/hooks";

export const DashboardPage = () => {
  const { translate } = useLangTranslation();
  const { user } = useAppSelector((state) => state.auth);
  const msg = translate("common.messages.while.dashboard.msg");

  return (
    <div>
      {msg} {user?.name}
    </div>
  );
};
