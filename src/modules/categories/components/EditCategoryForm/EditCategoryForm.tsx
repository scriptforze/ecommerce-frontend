import { Input, Typography, Form, Button, Row, Col, TreeSelect } from "antd";
import { Controller, useForm } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UpdateCategoryRequest,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/services/categories";
import { CategoriesFieldsType } from "./constants";
import { FormItem } from "@/modules/common/components";
import { StyledUpload } from "./styled";
import { CategoriesRoutesList } from "@/modules/categories";
import { isErrorWithMessage, pushNotification } from "@/modules/common/helpers";
import { EditCategoryFormProps } from "./types";

const { Text } = Typography;

export const EditCategoryForm = ({ category }: EditCategoryFormProps) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    category.image?.url
  );
  const { control, handleSubmit, setValue, setError } =
    useForm<UpdateCategoryRequest>({
      mode: "onChange",
      defaultValues: { name: category.name, parent_id: category.parent_id },
    });

  const [updateCategory, { error: updateCategoryError, isLoading }] =
    useUpdateCategoryMutation();

  const { data: getAllCategoriesData } = useGetAllCategoriesQuery({
    include: "children",
    perPage: 100,
  });

  const onSuccess = () => {
    pushNotification({
      type: "success",
      title: "Category updated",
      message: "Category was updated successfully.",
    });

    navigate(CategoriesRoutesList.CATEGORIES);
  };

  useEffect(() => {
    if (updateCategoryError && isErrorWithMessage(updateCategoryError)) {
      const errors = updateCategoryError.data.error;

      if (typeof errors === "object") {
        Object.entries(errors).forEach((error) => {
          setError(error[0] as CategoriesFieldsType, {
            type: "custom",
            message: error[1].join("\r\n"),
          });
        });
      }
    }
  }, [updateCategoryError]);

  const onUpdateCategory = async ({
    name,
    image,
    parent_id,
  }: UpdateCategoryRequest) => {
    const formData = new FormData();
    formData.append("_method", "PUT");

    if (name) {
      formData.append("name", name);
    }

    if (image) {
      formData.append("image", image);
    }

    if (parent_id) {
      formData.append("parent_id", parent_id as unknown as string);
    }

    await updateCategory({
      category: category.id,
      updateCategoryRequest: formData as unknown as UpdateCategoryRequest,
    });

    onSuccess();
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Image</div>
    </div>
  );

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(onUpdateCategory)}
      encType="multipart/form-data"
    >
      <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={6}>
          <Controller
            control={control}
            name="image"
            render={({ field: { name, ref }, fieldState: { error } }) => (
              <>
                <StyledUpload
                  id="image"
                  name={name}
                  ref={ref}
                  listType="picture-card"
                  showUploadList={false}
                  multiple={false}
                  beforeUpload={(file) => {
                    const image = URL.createObjectURL(file);

                    setValue("image", file);
                    setImageUrl(image);

                    return false;
                  }}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="category"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </StyledUpload>
                <Text type="danger">{error?.message} &nbsp;</Text>
              </>
            )}
          />
        </Col>
        <Col span={18}>
          <Row>
            <Col span={24}>
              <FormItem label="Name *" name="name">
                <Controller
                  control={control}
                  name="name"
                  rules={{
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input status={error && "error"} id="name" {...field} />
                      <Text type="danger">{error?.message} &nbsp;</Text>
                    </>
                  )}
                />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label="Parent category" name="parent_id">
                <Controller
                  control={control}
                  name="parent_id"
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <TreeSelect
                        showSearch
                        style={{ width: "100%" }}
                        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                        placeholder="Please select"
                        allowClear
                        treeDefaultExpandAll
                        treeNodeFilterProp="name"
                        fieldNames={{
                          label: "name",
                          value: "id",
                          children: "children",
                        }}
                        treeData={getAllCategoriesData?.data}
                        {...field}
                      />
                      <Text type="danger">{error?.message} &nbsp;</Text>
                    </>
                  )}
                />
              </FormItem>
            </Col>
          </Row>
        </Col>
      </Row>
      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          style={{ float: "right" }}
        >
          Update
        </Button>
      </FormItem>
    </Form>
  );
};
