import { Card, Steps } from "antd";
import { useState } from "react";
import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { BREADCRUMB_ITEMS, STEPS_ITEMS } from "./constants";
import { CustomAffixContainer } from "../../components";

export const CreateProduct = () => {
  const [affixed, setAffixed] = useState(false);
  document.title = "Ecommerce - New Product";

  const onAffixChanged = (affixValue?: boolean) => {
    const isAffixed = affixValue !== undefined ? affixValue : false;
    setAffixed(isAffixed);
  };

  return (
    <>
      <PageHeader title="New product" breadCrumbItems={BREADCRUMB_ITEMS} />
      <CustomAffixContainer
        offsetTop={64}
        $affixed={affixed}
        onChange={onAffixChanged}
      >
        <Card>
          <Steps current={0} labelPlacement="vertical" items={STEPS_ITEMS} />
        </Card>
      </CustomAffixContainer>
      <PageHeader title="New product" breadCrumbItems={BREADCRUMB_ITEMS} />
      <PageHeader title="New product" breadCrumbItems={BREADCRUMB_ITEMS} />
      <PageHeader title="New product" breadCrumbItems={BREADCRUMB_ITEMS} />
      <PageHeader title="New product" breadCrumbItems={BREADCRUMB_ITEMS} />
      <PageHeader title="New product" breadCrumbItems={BREADCRUMB_ITEMS} />
      <PageHeader title="New product" breadCrumbItems={BREADCRUMB_ITEMS} />
      <PageHeader title="New product" breadCrumbItems={BREADCRUMB_ITEMS} />
      <PageHeader title="New product" breadCrumbItems={BREADCRUMB_ITEMS} />
      <PageHeader title="New product" breadCrumbItems={BREADCRUMB_ITEMS} />
      <PageHeader title="New product" breadCrumbItems={BREADCRUMB_ITEMS} />
      <PageHeader title="New product" breadCrumbItems={BREADCRUMB_ITEMS} />
      <PageHeader title="New product" breadCrumbItems={BREADCRUMB_ITEMS} />
      <PageHeader title="New product" breadCrumbItems={BREADCRUMB_ITEMS} />
    </>
  );
};
