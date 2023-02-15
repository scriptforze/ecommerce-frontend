import { Select, TreeSelect, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { FormItem } from "@/modules/common/components";
import { CustomCard } from "@/modules/products/components/StoreProductStepsForms/GeneralStepForm/styled";
import { useGetAllCategoriesQuery } from "@/services/categories";
import { useGetAllTagsQuery } from "@/services/tags";
import { CustomStoreProductDto } from "../../StoreProductStepsForms/GeneralStepForm/types";

export const CategoryTagsGroup = () => {
  const { Text, Title } = Typography;
  const { setValue, control } = useFormContext<CustomStoreProductDto>();

  const { data: categories } = useGetAllCategoriesQuery({
    perPage: 100,
    include: "children",
  });

  const { data: tags } = useGetAllTagsQuery({
    perPage: 100,
  });

  return (
    <CustomCard>
      <FormItem>
        <Title level={5}>Category</Title>
        <Text type="secondary">
          <Text type="danger">*</Text>
          Select a category
        </Text>
        <Controller
          control={control}
          name="category_id"
          rules={{ required: true }}
          render={() => (
            <TreeSelect
              showSearch
              allowClear
              size="large"
              style={{ width: "100%" }}
              placeholder="Please select a category"
              treeData={categories?.data || []}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              fieldNames={{
                value: "id",
                label: "name",
                children: "children",
              }}
              onChange={(value) => setValue("category_id", value)}
            />
          )}
        />
      </FormItem>
      <FormItem>
        <Title level={5}>Tags</Title>
        <Text type="secondary">
          Put labels on your products to improve your search
        </Text>
        <Select
          allowClear
          mode="tags"
          size="large"
          fieldNames={{
            value: "id",
            label: "name",
          }}
          options={tags?.data}
          style={{ width: "100%" }}
          placeholder="Please select"
          onChange={(value) => setValue("tags", value)}
        />
      </FormItem>
    </CustomCard>
  );
};
