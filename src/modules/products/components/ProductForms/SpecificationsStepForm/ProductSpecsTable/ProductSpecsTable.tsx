import { Button, Form, Input, Table } from "antd";
import { Controller, useForm } from "react-hook-form";
import { ProductSpecsTableCell } from "./ProductSpecsTableCell";
import { ProductSpecsTableColumns } from "./ProductSpecsTableColumns";
import { ProductSpecsTableRow } from "./ProductSpecsTableRow";
import { ColumnTypes, ProductSpecificationsTableProps } from "./types";
import { FormItem } from "@/modules/common/components";
import {
  ProductSpecification,
  useUpdateProductSpecificationMutation,
  useDeleteProductSpecificationMutation,
  StoreProductProductSpecificationRequest,
  useGetAllProductSpecificationsByProductQuery,
  useSaveProductSpecificationByProductMutation,
} from "@/services/productSpecifications";
import { useLangTranslation } from "@/modules/common/hooks";

export const ProductSpecsTable = ({
  product,
}: ProductSpecificationsTableProps) => {
  const {
    control,
    resetField,
    handleSubmit,
    formState: { isValid },
  } = useForm<StoreProductProductSpecificationRequest>({
    mode: "onChange",
  });

  const { lang } = useLangTranslation();
  const { isFetching, data: specs } =
    useGetAllProductSpecificationsByProductQuery({
      lang,
      product: product.id,
      include: "status",
    });

  const components = {
    body: {
      row: ProductSpecsTableRow,
      cell: ProductSpecsTableCell,
    },
  };

  const [updateSpec, { isLoading: isUpdateSpecLoading }] =
    useUpdateProductSpecificationMutation();

  const [deleteSpec, { isLoading: isDeleteSpecLoading }] =
    useDeleteProductSpecificationMutation();

  const [storeSpec, { isLoading: isStoreSpecLoading }] =
    useSaveProductSpecificationByProductMutation();

  const onStore = (
    storeProductProductSpecificationRequest: StoreProductProductSpecificationRequest
  ) => {
    if (isValid) {
      storeSpec({
        product: product.id,
        storeProductProductSpecificationRequest,
      })
        .unwrap()
        .then(() => resetField("name"));
    }
  };

  const handleSave = (record: ProductSpecification) => {
    const { id: productSpecification, name, value } = record;
    const recordBeforeChanges = specs?.data?.find(
      (spec) => spec.id === productSpecification
    );

    if (
      recordBeforeChanges?.name !== name.trim() ||
      recordBeforeChanges?.value !== value.trim()
    ) {
      updateSpec({
        productSpecification,
        updateProductSpecificationRequest: {
          name,
          value,
        },
      });
    }
  };

  const handleDelete = (record: ProductSpecification) => {
    const { id: productSpecification } = record;
    deleteSpec({ productSpecification });
  };

  const columns = ProductSpecsTableColumns({ handleDelete }).map((col) => {
    const { editable, dataIndex, title } = col;
    if (!editable) return col;

    return {
      ...col,
      onCell: (record: ProductSpecification) => ({
        title,
        record,
        editable,
        dataIndex,
        handleSave,
      }),
    };
  });

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
                placeholder="Enter the name"
                disabled={isStoreSpecLoading}
                status={error && "error"}
                {...field}
              />
            </FormItem>
          )}
        />
        <Controller
          name="value"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <Input
                placeholder="Enter the value"
                disabled={isStoreSpecLoading}
                status={error && "error"}
                {...field}
              />
            </FormItem>
          )}
        />
        <FormItem>
          <Button type="primary" htmlType="submit" loading={isStoreSpecLoading}>
            Add Specification
          </Button>
        </FormItem>
      </Form>
      <Table
        bordered
        components={components}
        dataSource={specs?.data}
        rowKey={(record) => record.id}
        columns={columns as ColumnTypes}
        rowClassName={() => "editable-row"}
        loading={isFetching || isUpdateSpecLoading || isDeleteSpecLoading}
      />
    </>
  );
};
