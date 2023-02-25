import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { BreadCrumbItem } from "@/modules/common/components/PageHeader/types";
import { ProductAttributesRoutesList } from "@/modules/product-attributes/routes";
import { ProductAttributeForm } from "../../components";

export const StoreProductAttributePage = () => {
  const BREADCRUMB_ITEMS: BreadCrumbItem[] = [
    {
      title: "Product Attributes",
      link: ProductAttributesRoutesList.PRODUCT_ATTRIBUTES,
    },
    {
      title: "Create Product Attribute",
    },
  ];
  return (
    <>
      <PageHeader
        title="Create Product Attribute"
        breadCrumbItems={BREADCRUMB_ITEMS}
      />
      <ProductAttributeForm />
    </>
  );
};
