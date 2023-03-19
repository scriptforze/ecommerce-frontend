import { Button, Space, Upload, Typography } from "antd";
import {
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { CustomBadge } from "@/modules/products/components/ProductForms/GeneralStepForm/styled";
import {
  StoreResourceRequest,
  useSaveResourceMutation,
} from "@/services/resources";
import { CustomStoreProductDto } from "../../types";
import { CustomCard } from "@/modules/products/components/CustomCard";

export const ImagesGroup = () => {
  const { Text } = Typography;
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CustomStoreProductDto>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
    keyName: "fieldId",
    rules: {
      required: true,
      validate: (value) => {
        return value.length >= 1;
      },
    },
  });

  const watchImages = watch("images");
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [resourceToEdit, setResourceToEdit] = useState<{
    id: number;
    url: string;
    index: number;
  } | null>(null);

  const [
    saveResource,
    {
      data: dataResource,
      isSuccess: isResourceSuccess,
      isLoading: isResourceLoading,
    },
  ] = useSaveResourceMutation();

  useEffect(() => {
    if (isCreating && dataResource && isResourceSuccess) {
      const { id = 0, urls } = dataResource.data || {};
      const { small = "" } = urls || {};
      append({ id, url: small });
      setIsCreating(false);
    }
  }, [isCreating, isResourceSuccess, dataResource]);

  useEffect(() => {
    if (isEditing && dataResource && resourceToEdit && isResourceSuccess) {
      const { id = 0, urls } = dataResource.data || {};
      const { small = "" } = urls || {};
      const { index } = resourceToEdit;

      setValue(`images.${index}.id`, id);
      setValue(`images.${index}.url`, small);

      setIsEditing(false);
      setResourceToEdit(null);
    }
  }, [isEditing, resourceToEdit, isResourceSuccess, dataResource]);

  const UploadButton = (
    <div>
      {isCreating && isResourceLoading ? (
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

  const controlledFields = fields.map((field, index) => ({
    ...field,
    ...watchImages[index],
  }));

  return (
    <CustomCard title="Product Images">
      {controlledFields.map((field, index) => (
        <Controller
          control={control}
          key={field.fieldId}
          name={`images.${index}`}
          render={() => (
            <CustomBadge
              count={
                index === 0 ? (
                  <Space className="button-badge__button--checked">
                    <CheckOutlined />
                  </Space>
                ) : (
                  <Button
                    onClick={() => remove(index)}
                    className="button-badge__button--remove"
                  >
                    <CloseOutlined />
                  </Button>
                )
              }
            >
              <Space>
                <Upload
                  multiple={false}
                  showUploadList={false}
                  listType="picture-card"
                  customRequest={async (options) => {
                    setIsEditing(true);
                    const formData = new FormData();
                    formData.append("file", options.file);

                    const { url, id } = field;
                    setResourceToEdit({ index, id, url });

                    await saveResource({
                      storeResourceRequest:
                        formData as unknown as StoreResourceRequest,
                    });
                  }}
                >
                  {isEditing &&
                  isResourceLoading &&
                  resourceToEdit?.index === index ? (
                    <>
                      <LoadingOutlined />
                      <div style={{ marginTop: 8 }}>Updating</div>
                    </>
                  ) : (
                    <img
                      src={field.url}
                      alt="Product Media"
                      style={{
                        width: "100%",
                        maxHeight: "100%",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </Upload>
              </Space>
            </CustomBadge>
          )}
        />
      ))}
      {fields.length < 4 && (
        <Space align="start" size={20} wrap>
          <Space>
            <Upload
              id="image"
              multiple={false}
              showUploadList={false}
              listType="picture-card"
              customRequest={async (options) => {
                setIsCreating(true);
                const formData = new FormData();
                formData.append("file", options.file);

                await saveResource({
                  storeResourceRequest:
                    formData as unknown as StoreResourceRequest,
                });
              }}
            >
              {UploadButton}
            </Upload>
          </Space>
        </Space>
      )}
      {errors.images?.root?.type === "required" && (
        <Space className="custom-card__footer--text" size={1}>
          <Text type="danger">* Select at least one picture</Text>
        </Space>
      )}
    </CustomCard>
  );
};
