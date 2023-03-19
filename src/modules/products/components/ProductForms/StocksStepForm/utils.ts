import { groupBy } from "lodash";
import { ProductAttribute } from "@/services/productAttributes";
import {
  AttributeOption,
  AttributesOptions,
  AttributeVariations,
  AttributeVariation,
} from "./types";

const generateVariations = (
  flattenOptions: AttributeOption[] = []
): AttributeVariation[] => {
  const groupedOptions = groupBy(flattenOptions, "attributeName");
  const attributeNames = Object.keys(groupedOptions);

  const variations = attributeNames.reduce<AttributeVariation[]>(
    (result, attributeName) => {
      const options = groupedOptions[attributeName];
      const variationsResult = options.map((option) => ({
        [attributeName]: {
          optionId: option.optionId,
          optionValue: option.optionValue,
        },
      }));
      return result.length
        ? result.flatMap((variation) =>
            variationsResult.map((variationResult) => ({
              ...variation,
              attributes: { ...variation.attributes, ...variationResult },
            }))
          )
        : variationsResult.map((variation) => ({
            sku: "",
            price: 0,
            stock: 0,
            width: 0,
            height: 0,
            length: 0,
            weight: 0,
            attributes: { ...variation },
          }));
    },
    []
  );
  return variations;
};

export const getVariationsGroupedByAttribute = (
  attribute: ProductAttribute,
  selectedOptions: number[],
  attributes: ProductAttribute[] = []
): AttributeVariations[] => {
  const attributeOptions = attribute.product_attribute_options?.filter((opt) =>
    selectedOptions.includes(opt.id)
  );

  const optionsGroupedByAttributeOptions =
    attributeOptions?.map((attributeOption) => {
      const attributesOptions = attributes
        .filter((attr) => attr.id !== attribute.id)
        .map<AttributesOptions>((attr) => {
          const options =
            attr.product_attribute_options
              ?.filter((opt) => selectedOptions.includes(opt.id))
              ?.map<AttributeOption>((opt) => ({
                optionId: opt.id,
                optionValue: opt.name,
                attributeName: attr.name,
              })) || [];

          return {
            attributeId: attr.id,
            attributeName: attr.name,
            options,
          };
        })
        .filter((attr) => attr.options?.length);

      const flattenOptions = attributesOptions?.flatMap(
        (attr) => attr.options || []
      );

      const variations = generateVariations(flattenOptions);

      return {
        option: attributeOption,
        attributeId: attribute.id,
        attributeName: attribute.name,
        variations,
        attributesOptions,
      };
    }) || [];

  return optionsGroupedByAttributeOptions;
};
