import { ProductAttributeOption } from "@/services/productAttributeOptions";

export const parseProductAttributesOptions = (
  productAttributeOptions?: ProductAttributeOption[]
) => {
  const attributeOptions = productAttributeOptions?.reduce(
    (result, current) => {
      const { product_attribute: attribute, id: valueId } = current;
      const { id: attributeId } = attribute!;

      const attributeIndex = result.findIndex(
        (opt) => opt.attribute === attributeId
      );

      if (attributeIndex === -1) {
        result.push({
          attribute: attributeId,
          value: [valueId],
        });
      } else {
        result[attributeIndex].value?.push(valueId);
      }

      return result;
    },
    [] as { attribute?: number; value?: number[] }[]
  );

  return attributeOptions;
};
