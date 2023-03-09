import { Input, Typography, Form, Button, Row, Col, TreeSelect } from "antd";
import { Controller, useForm } from "react-hook-form";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import {
  StoreCategoryRequest,
  useGetAllCategoriesQuery,
  useSaveCategoryMutation,
  useUpdateCategoryMutation,
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
import { CategoryFormProps } from "./types";
import { useLangTranslation } from "@/modules/common/hooks";

const { Text } = Typography;

export const CategoryForm = ({ category }: CategoryFormProps) => {
  const navigate = useNavigate();
  const { translate } = useLangTranslation();
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    category?.image?.urls.small
  );

  const defaultValues = category
    ? {
        name: category.name,
        image: category.image?.id,
        parent_id: category.parent_id,
      }
    : STORE_CATEGORY_DEFAULT;

  const { control, handleSubmit, setValue, setError } =
    useForm<StoreCategoryRequest>({
      mode: "onChange",
      defaultValues,
    });

  const [updateCategory, { isLoading: isUpdateCategoryLoading }] =
    useUpdateCategoryMutation();

  const [saveCategory, { isLoading: isSaveCategoryLoading }] =
    useSaveCategoryMutation();

  const [
    saveResource,
    {
      data: dataResource,
      isSuccess: isResourceSuccess,
      isLoading: isResourceLoading,
    },
  ] = useSaveResourceMutation();

  const { data: getAllCategoriesData } = useGetAllCategoriesQuery({
    perPage: 100,
    include: "children",
  });

  useEffect(() => {
    if (isResourceSuccess) {
      setValue("image", dataResource!.data!.id);
      setImageUrl(dataResource?.data?.urls.small);
    }
  }, [isResourceSuccess]);

  const onRequestSuccess = () => {
    const createdTitle = translate(
      "categories.form.messages.success.create.title"
    );
    const createdMessage = translate(
      "categories.form.messages.success.create.msg"
    );
    const updatedTitle = translate(
      "categories.form.messages.success.update.title"
    );
    const updatedMessage = translate(
      "categories.form.messages.success.update.msg"
    );

    const title = category ? updatedTitle : createdTitle;
    const message = category ? updatedMessage : createdMessage;

    pushNotification({ type: "success", title, message });
    navigate(CategoriesRoutesList.CATEGORIES);
  };

  const onRequestError = (error?: FetchBaseQueryError | SerializedError) => {
    if (error && isErrorWithMessage(error)) {
      const errors = error.data.error;
      if (typeof errors === "object") {
        Object.entries(errors).forEach((err) => {
          const [fieldType, message] = err || [];
          setError(fieldType as CategoriesFieldsType, {
            type: "custom",
            message: message.join("\r\n"),
          });
        });
      }
    }
  };

  const onSubmit = ({ name, image, parent_id }: StoreCategoryRequest) => {
    if (!category) {
      saveCategory({
        storeCategoryRequest: {
          name,
          image,
          parent_id,
        },
      })
        .unwrap()
        .then(onRequestSuccess)
        .catch(onRequestError);
    } else {
      const imageToUpdate = category.image?.id === image ? undefined : image;

      updateCategory({
        category: category.id,
        updateCategoryRequest: {
          name,
          parent_id,
          image: imageToUpdate,
        },
      })
        .unwrap()
        .then(onRequestSuccess)
        .catch(onRequestError);
    }
  };

  const uploadButton = (
    <div>
      {isResourceLoading ? (
        <>
          <LoadingOutlined />
          <div style={{ marginTop: 8 }}>
            {translate("categories.form.inputs.image.uploading")}
          </div>
        </>
      ) : (
        <>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>
            {translate("categories.form.inputs.image.placeholder")}
          </div>
        </>
      )}
    </div>
  );

  return (
    <Form
      layout="vertical"
      autoComplete="off"
      onFinish={handleSubmit(onSubmit)}
    >
      <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={6}>
          <Controller
            name="image"
            control={control}
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
                  ref={ref}
                  id="image"
                  name={name}
                  multiple={false}
                  showUploadList={false}
                  listType="picture-card"
                  customRequest={async (options) => {
                    const formData = new FormData();
                    formData.append("file", options.file);

                    await saveResource({
                      storeResourceRequest:
                        formData as unknown as StoreResourceRequest,
                    });
                  }}
                >
                  {imageUrl && !isResourceLoading ? (
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
              <Controller
                name="name"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <FormItem
                    name="name"
                    label={`${translate(
                      "categories.form.inputs.name.label"
                    )} *`}
                  >
                    <Input
                      {...field}
                      id="name"
                      status={error && "error"}
                      placeholder={translate(
                        "categories.form.inputs.name.placeholder"
                      )}
                    />
                    <Text type="danger">{error?.message} &nbsp;</Text>
                  </FormItem>
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="parent_id"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormItem
                    name="parent_id"
                    label={translate("categories.form.inputs.parent.label")}
                  >
                    <TreeSelect
                      showSearch
                      allowClear
                      treeDefaultExpandAll
                      style={{ width: "100%" }}
                      treeNodeFilterProp="name"
                      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                      placeholder={translate(
                        "categories.form.inputs.parent.placeholder"
                      )}
                      onChange={(value) => field.onChange(value)}
                      value={
                        getAllCategoriesData?.data?.length
                          ? field.value
                          : undefined
                      }
                      fieldNames={{
                        value: "id",
                        label: "name",
                        children: "children",
                      }}
                      treeData={getAllCategoriesData?.data}
                    />
                    <Text type="danger">{error?.message} &nbsp;</Text>
                  </FormItem>
                )}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
          style={{ float: "right" }}
          loading={isSaveCategoryLoading || isUpdateCategoryLoading}
        >
          {category
            ? translate("categories.form.submit.update")
            : translate("categories.form.submit.create")}
        </Button>
      </FormItem>
    </Form>
  );
};
