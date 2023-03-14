import { ProductAttributeOption } from "@/services/productAttributeOptions";
import {
  StoreProductGeneralRequest,
  UpdateProductGeneralRequest,
} from "@/services/products";
import { ActionToPerform, CustomStoreProductDto } from "./types";

export const characterCount = {
  formatter: (info: { value: string; count: number; maxLength?: number }) =>
    `${info.count} of ${info.maxLength} characters`,
};

export const parseDataByAction = (
  action: ActionToPerform,
  data: CustomStoreProductDto
): StoreProductGeneralRequest | UpdateProductGeneralRequest => {
  switch (action) {
    case "create": {
      const { product_attribute_options: options, images: productImages } =
        data;

      const hasValidOptions = options?.every(
        (opt) => opt.attribute && !!opt.value?.length
      );
      const product_attribute_options = hasValidOptions
        ? options?.reduce(
            (result, { value = [] }) => {
              result.attach.push(...value.filter((opt) => opt));
              return { ...result };
            },
            { attach: [] } as { attach: number[] }
          )
        : undefined;

      const is_variable = !!product_attribute_options?.attach.length;

      const images = productImages.reduce(
        (result, { id }, index) => {
          const location = index + 1;
          result.attach.push({ id, location });
          return { ...result };
        },
        { attach: [] } as { attach: { id: number; location: number }[] }
      );

      return {
        ...data,
        images,
        is_variable,
        type: "product",
        product_attribute_options,
        tags: { attach: data.tags },
      } as StoreProductGeneralRequest;
    }
    default:
      throw new Error(`The form action ${action} is not supported`);
  }
};

export const parseProductAttributesOptions = (
  productAttributeOptions?: ProductAttributeOption[]
) => {
  return (
    productAttributeOptions?.reduce((result, current) => {
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
    }, [] as { attribute?: number; value?: number[] }[]) || []
  );
};
