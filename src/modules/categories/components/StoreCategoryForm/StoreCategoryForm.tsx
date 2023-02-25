import { Input, Typography, Form, Button, Row, Col, TreeSelect } from "antd";
import { Controller, useForm } from "react-hook-form";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  StoreCategoryRequest,
  useGetAllCategoriesQuery,
  useSaveCategoryMutation,
} from "@/services/categories";
import { CategoriesFieldsType, STORE_CATEGORY_DEFAULT } from "./constants";
import { FormItem } from "@/modules/common/components";
import { StyledUpload } from "./styled";
import { CategoriesRoutesList } from "@/modules/categories";
import { isErrorWithMessage, pushNotification } from "@/modules/common/helpers";
import {
  StoreResourceRequest,
  useSaveResourceMutation,
} from "@/services/resources";

const { Text } = Typography;

export const StoreCategoryForm = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string>();
  const { control, handleSubmit, setValue, setError } =
    useForm<StoreCategoryRequest>({
      mode: "onChange",
      defaultValues: STORE_CATEGORY_DEFAULT,
    });

  const [saveCategory, { error: saveCategoryError, isLoading, isSuccess }] =
    useSaveCategoryMutation();

  const [
    saveResource,
    {
      isSuccess: isResourceSuccess,
      isLoading: isResourceLoading,
      data: dataResource,
    },
  ] = useSaveResourceMutation();

  const { data: getAllCategoriesData } = useGetAllCategoriesQuery({
    include: "children",
    perPage: 100,
  });

  useEffect(() => {
    if (isSuccess) {
      pushNotification({
        type: "success",
        title: "Category created",
        message: "Category was created successfully.",
      });

      navigate(CategoriesRoutesList.CATEGORIES);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isResourceSuccess) {
      setValue("image", dataResource!.data!.id);
      setImageUrl(dataResource?.data?.urls.small);
    }
  }, [isResourceSuccess]);

  useEffect(() => {
    if (saveCategoryError && isErrorWithMessage(saveCategoryError)) {
      const errors = saveCategoryError.data.error;

      if (typeof errors === "object") {
        Object.entries(errors).forEach((error) => {
          const [fieldType, message] = error || [];
          setError(fieldType as CategoriesFieldsType, {
            type: "custom",
            message: message.join("\r\n"),
          });
        });
      }
    }
  }, [saveCategoryError]);

  const onStoreCategory = ({
    name,
    image,
    parent_id,
  }: StoreCategoryRequest) => {
    saveCategory({
      storeCategoryRequest: {
        name,
        image,
        parent_id,
      },
    });
  };

  const uploadButton = (
    <div>
      {isResourceLoading ? (
        <>
          <LoadingOutlined />
          <div style={{ marginTop: 8 }}>Uploading</div>
        </>
      ) : (
        <>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Image</div>
        </>
      )}
    </div>
  );

  return (
    <Form layout="vertical" onFinish={handleSubmit(onStoreCategory)}>
      <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={6}>
          <Controller
            control={control}
            name="image"
            rules={{
              validate: (value) => {
                if (!value) {
                  return "Image is required";
                }

                return true;
              },
            }}
            render={({ field: { name, ref }, fieldState: { error } }) => (
              <>
                <StyledUpload
                  id="image"
                  name={name}
                  ref={ref}
                  listType="picture-card"
                  showUploadList={false}
                  multiple={false}
                  customRequest={async (options) => {
                    const formData = new FormData();
                    formData.append("file", options.file);

                    await saveResource({
                      storeResourceRequest:
                        formData as unknown as StoreResourceRequest,
                    });
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
          Save
        </Button>
      </FormItem>
    </Form>
  );
};
