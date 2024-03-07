import { useParams } from "react-router-dom";
import { ProductAttributesRoutesList } from "@/modules/product-attributes/routes";
import { BreadCrumbItem } from "@/modules/common/components/PageHeader/types";
import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { useGetProductAttributeByIdQuery } from "@/services/productAttributes";
import { NotFound } from "@/modules/common/components";
import { useLangTranslation } from "@/modules/common/hooks";
import { ProductAttributeForm } from "../../components/ProductAttributeForm";

export const EditProductAttributePage = () => {
  const { translate } = useLangTranslation();
  const { id } = useParams();
  const BREADCRUMB_ITEMS: BreadCrumbItem[] = [
    {
      title: translate("products.form.title.productAttributes"),
      link: ProductAttributesRoutesList.PRODUCT_ATTRIBUTES,
    },
    {
      title: translate("products.form.titleCreate.editProductAttribute"),
    },
  ];

  const productAttribute = parseInt(id!, 10);

  const {
    data: productAttributeData,
    isFetching,
    isError,
  } = useGetProductAttributeByIdQuery({
    productAttribute,
  });

  if (isFetching) return <>{`${translate("common.loading")}...`}</>;
  if (isError) return <NotFound />;

  return (
    <>
      <PageHeader
        title={translate("products.form.titleCreate.editProductAttribute")}
        breadCrumbItems={BREADCRUMB_ITEMS}
      />
      <ProductAttributeForm productAttribute={productAttributeData?.data} />
    </>
  );
};
