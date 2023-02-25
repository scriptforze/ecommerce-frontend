import { useParams } from "react-router-dom";
import { ProductAttributesRoutesList } from "@/modules/product-attributes/routes";
import { BreadCrumbItem } from "@/modules/common/components/PageHeader/types";
import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { useGetProductAttributeByIdQuery } from "@/services/productAttributes";
import { NotFound } from "@/modules/common/components";
import { ProductAttributeForm } from "../../components/ProductAttributeForm";

export const EditProductAttributePage = () => {
  const { id } = useParams();
  const BREADCRUMB_ITEMS: BreadCrumbItem[] = [
    {
      title: "Product Attributes",
      link: ProductAttributesRoutesList.PRODUCT_ATTRIBUTES,
    },
    {
      title: "Edit Product Attribute",
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

  if (isFetching) return <>loading...</>;
  if (isError) return <NotFound />;

  return (
    <>
      <PageHeader
        title="Edit Product Attribute"
        breadCrumbItems={BREADCRUMB_ITEMS}
      />
      <ProductAttributeForm productAttribute={productAttributeData?.data} />
    </>
  );
};
