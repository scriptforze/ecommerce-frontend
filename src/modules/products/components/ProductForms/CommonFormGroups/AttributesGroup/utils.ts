import { ProductAttribute } from "@/services/productAttributes";
import { ControlledFieldType } from "./types";

export const refineDuplicatedAttributes = (
  field: ControlledFieldType,
  fields: ControlledFieldType[],
  attributes?: ProductAttribute[]
) => {
  if (attributes && attributes.length) {
    const { attribute: selectedAttribute } = field;

    const filteredAttributes = attributes.filter((attribute) => {
      const isDuplicated = fields.some(
        (cfield) =>
          cfield.attribute === attribute.id &&
          selectedAttribute !== attribute.id
      );
      return !isDuplicated;
    });

    return filteredAttributes;
  }

  return attributes;
};
