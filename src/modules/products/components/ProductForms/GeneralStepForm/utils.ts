import { Product } from "@/services/products";
import { CustomProductFormValues } from "./types";

export const characterCount = {
  formatter: (info: { value: string; count: number; maxLength?: number }) =>
    `${info.count} of ${info.maxLength} characters`,
};

export const parseData = (data: CustomProductFormValues, product?: Product) => {
  const {
    tax,
    name,
    tags,
    type,
    stock,
    price,
    width,
    height,
    weight,
    length,
    images,
    category_id,
    description,
    is_variable,
    short_description,
    product_attribute_options: options,
  } = data;

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

  /* const images = productImages.reduce(
    (result, { id }, index) => {
      const location = index + 1;
      result.attach.push({ id, location });
      return { ...result };
    },
    { attach: [] } as { attach: { id: number; location: number }[] }
  ); */

  return {
    tax,
    name,
    type,
    stock,
    price,
    width,
    height,
    weight,
    length,
    category_id,
    description,
    is_variable,
    short_description,
    product_attribute_options,
    tags: !product ? { attach: tags.attach } : tags,
    images: !product ? { attach: images.attach } : images,
  };
};
