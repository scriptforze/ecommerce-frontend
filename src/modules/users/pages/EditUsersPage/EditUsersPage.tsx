import { useLangTranslation } from "@/modules/common/hooks";

export const EditUsersPage = () => {
  const { translate } = useLangTranslation();

  return <div>{translate("users.list.messages.updateWhile")}</div>;
};
