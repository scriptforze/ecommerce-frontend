import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { BreadCrumbItem } from "@/modules/common/components/PageHeader/types";
import { ProductAttributesRoutesList } from "@/modules/product-attributes/routes";
import { useLangTranslation } from "@/modules/common/hooks";
import { ProductAttributeForm } from "../../components";

export const StoreProductAttributePage = () => {
  const { translate } = useLangTranslation();
  const BREADCRUMB_ITEMS: BreadCrumbItem[] = [
    {
      title: translate("products.form.title.productAttributes"),
      link: ProductAttributesRoutesList.PRODUCT_ATTRIBUTES,
    },
    {
      title: translate("products.form.titleCreate.createProductAttribute"),
    },
  ];
  return (
    <>
      <PageHeader
        title={translate("products.form.titleCreate.createProductAttribute")}
        breadCrumbItems={BREADCRUMB_ITEMS}
      />
      <ProductAttributeForm />
    </>
  );
};
