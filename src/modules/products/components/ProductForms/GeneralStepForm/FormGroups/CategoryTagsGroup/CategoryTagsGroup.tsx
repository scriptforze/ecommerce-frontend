import { Select, TreeSelect, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { FormItem } from "@/modules/common/components";
import { useGetAllCategoriesQuery } from "@/services/categories";
import { useGetAllTagsQuery } from "@/services/tags";
import { CustomStoreProductDto } from "../../types";
import { CustomCard } from "@/modules/products/components/CustomCard";

export const CategoryTagsGroup = () => {
  const { Text } = Typography;
  const { control } = useFormContext<CustomStoreProductDto>();

  const { data: categories, isFetching: isCategoryFetching } =
    useGetAllCategoriesQuery({
      perPage: 100,
      include: "children",
    });

  const { data: tags, isFetching: isTagsFetching } = useGetAllTagsQuery({
    perPage: 100,
  });

  return (
    <CustomCard title="Category and Tags">
      <Controller
        control={control}
        name="category_id"
        rules={{
          required: {
            value: true,
            message: "Category is required",
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <FormItem label="Select a category:" required>
              <TreeSelect
                showSearch
                allowClear
                size="large"
                style={{ width: "100%" }}
                status={error && "error"}
                loading={isCategoryFetching}
                disabled={isCategoryFetching}
                treeData={categories?.data || []}
                placeholder="Please select a category"
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
        name="tags"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Tags are required",
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <FormItem
              required
              label="Put labels on your products to improve your search:"
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
                onChange={field.onChange}
                placeholder="Please select"
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
