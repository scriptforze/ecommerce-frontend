import { Select, TreeSelect, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { FormItem } from "@/modules/common/components";
import { useGetAllCategoriesQuery } from "@/services/categories";
import { useGetAllTagsQuery } from "@/services/tags";
import { CustomProductFormValues } from "../../types";
import { useLangTranslation } from "@/modules/common/hooks";
import { CustomCard } from "@/modules/products/components/CustomCard";

export const CategoryTagsGroup = () => {
  const { Text } = Typography;
  const { control, setValue, getValues } =
    useFormContext<CustomProductFormValues>();

  const { data: categories, isFetching: isCategoryFetching } =
    useGetAllCategoriesQuery({
      perPage: 100,
      include: "children",
    });

  const { data: tags, isFetching: isTagsFetching } = useGetAllTagsQuery({
    perPage: 100,
  });

  const handleTagsChange = (value: number[]) => {
    const tagsValue = getValues("tags");
    const arrayTags = getValues("array_tags");
    const tagsToAttach = value.filter((tag) => !arrayTags.includes(tag));
    const detachedTags = arrayTags.filter((tag) => !value.includes(tag));

    const finalTagsToAttach = [...tagsValue.attach, ...tagsToAttach];
    const finalTagsToDetach = [...tagsValue.detach, ...detachedTags];

    setValue("array_tags", value);
    setValue("tags.attach", finalTagsToAttach);
    setValue("tags.detach", finalTagsToDetach);
  };
  const { translate } = useLangTranslation();

  return (
    <CustomCard title={translate("products.form.titleCreate.category")}>
      <Controller
        control={control}
        name="category_id"
        rules={{
          required: {
            value: true,
            message: translate(
              "products.list.messages.success.validation.requiredCat"
            ),
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <FormItem
              label={`${translate(
                "products.list.messages.success.subtitle.select"
              )}:`}
              required
            >
              <TreeSelect
                showSearch
                allowClear
                size="large"
                style={{ width: "100%" }}
                status={error && "error"}
                loading={isCategoryFetching}
                disabled={isCategoryFetching}
                treeData={categories?.data || []}
                placeholder={translate(
                  "products.list.messages.success.subtitle.select"
                )}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                fieldNames={{
                  value: "id",
                  label: "name",
                  children: "children",
                }}
                onChange={field.onChange}
                value={categories?.data?.length ? field.value : undefined}
              />
              <Text type="danger">{error?.message} &nbsp;</Text>
            </FormItem>
          );
        }}
      />

      <Controller
        name="array_tags"
        control={control}
        rules={{
          required: {
            value: true,
            message: translate(
              "products.list.messages.success.validation.requiredTag"
            ),
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <FormItem
              required
              label={`${translate(
                "products.list.messages.success.subtitle.labels"
              )}:`}
            >
              <Select
                allowClear
                mode="tags"
                size="large"
                fieldNames={{
                  value: "id",
                  label: "name",
                }}
                options={tags?.data}
                loading={isTagsFetching}
                disabled={isTagsFetching}
                style={{ width: "100%" }}
                status={error && "error"}
                onChange={handleTagsChange}
                placeholder={translate(
                  "products.list.messages.success.subtitle.select"
                )}
                value={tags?.data?.length ? field.value : undefined}
              />
              <Text type="danger">{error?.message} &nbsp;</Text>
            </FormItem>
          );
        }}
      />
    </CustomCard>
  );
};
