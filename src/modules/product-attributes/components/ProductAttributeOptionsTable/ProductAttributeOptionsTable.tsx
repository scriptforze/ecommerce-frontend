import { Button, Form, Input, Table } from "antd";
import { Controller, useForm } from "react-hook-form";
import {
  ProductAttributeOption,
  StoreProductAttributeOptionRequest,
  useDeleteProductAttributeOptionMutation,
  useGetAllProductAttributeOptionsByProductAttributeQuery,
  useSaveProductAttributeOptionMutation,
  useUpdateProductAttributeOptionMutation,
} from "@/services/productAttributeOptions";
import { ProductAttributeOptionsCell } from "./ProductAttributeOptionsCell";
import { ProductAttributeOptionsColumns } from "./ProductAttributeOptionsColumns";
import { ProductAttributeOptionsRow } from "./ProductAttributeOptionsRow";
import {
  ColumnTypes,
  CustomProductAttributeOption,
  ProductAttributeOptionsFormProps,
} from "./types";
import { useLangTranslation } from "@/modules/common/hooks";
import { FormItem } from "@/modules/common/components";

export const ProductAttributeOptionsTable = ({
  productAttribute,
}: ProductAttributeOptionsFormProps) => {
  const {
    control,
    resetField,
    handleSubmit,
    formState: { isValid },
  } = useForm<StoreProductAttributeOptionRequest>({
    mode: "onChange",
    defaultValues: {
      option: "#000",
      product_attribute_id: productAttribute.id,
    },
  });

  const { translate } = useLangTranslation();

  const { isFetching, data: options } =
    useGetAllProductAttributeOptionsByProductAttributeQuery({
      productAttribute: productAttribute.id,
      include: "status",
    });

  const components = {
    body: {
      row: ProductAttributeOptionsRow,
      cell: ProductAttributeOptionsCell,
    },
  };

  const [updateOption, { isLoading: isUpdateOptionLoading }] =
    useUpdateProductAttributeOptionMutation();

  const [deleteOption, { isLoading: isDeleteOptionLoading }] =
    useDeleteProductAttributeOptionMutation();

  const [storeOption, { isLoading: isStoreOptionLoading }] =
    useSaveProductAttributeOptionMutation();

  const onStore = (
    storeProductAttributeOptionRequest: StoreProductAttributeOptionRequest
  ) => {
    if (isValid) {
      storeOption({
        storeProductAttributeOptionRequest,
      })
        .unwrap()
        .then(() => resetField("name"));
    }
  };

  const handleSave = (record: CustomProductAttributeOption) => {
    const { id: productAttributeOption, name } = record;
    const recordBeforeChanges = options?.data?.find(
      (opt) => opt.id === productAttributeOption
    );

    if (recordBeforeChanges?.name !== name.trim()) {
      updateOption({
        productAttributeOption,
        updateProductAttributeOptionRequest: {
          name,
        },
      });
    }
  };

  const handleDelete = (record: ProductAttributeOption) => {
    const { id: productAttributeOption } = record;
    deleteOption({ productAttributeOption });
  };

  const columns = ProductAttributeOptionsColumns({ handleDelete }).map(
    (col) => {
      const { editable, dataIndex, title } = col;
      if (!editable) return col;

      return {
        ...col,
        onCell: (record: ProductAttributeOption) => ({
          title,
          record,
          editable,
          dataIndex,
          handleSave,
        }),
      };
    }
  );

  return (
    <>
      <Form
        layout="inline"
        autoComplete="off"
        style={{ marginBottom: 20 }}
        onFinish={handleSubmit(onStore)}
      >
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <Input
                placeholder={translate(
                  "products.list.placeholder.enterOptionName"
                )}
                disabled={isStoreOptionLoading}
                status={error && "error"}
                {...field}
              />
            </FormItem>
          )}
        />
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            loading={isStoreOptionLoading}
          >
            {translate("products.form.addOption")}
          </Button>
        </FormItem>
      </Form>
      <Table
        bordered
        components={components}
        dataSource={options?.data}
        rowKey={(record) => record.id}
        columns={columns as ColumnTypes}
        rowClassName={() => "editable-row"}
        loading={isFetching || isUpdateOptionLoading || isDeleteOptionLoading}
      />
    </>
  );
};
