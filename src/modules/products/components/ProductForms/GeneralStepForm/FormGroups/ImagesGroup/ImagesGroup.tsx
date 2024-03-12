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
import { CustomProductFormValues } from "../../types";
import { CustomCard } from "@/modules/products/components/CustomCard";
import { useAppSelector, useLangTranslation } from "@/modules/common/hooks";

export const ImagesGroup = () => {
  const { translate } = useLangTranslation();
  const { Text } = Typography;
  const {
    watch,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<CustomProductFormValues>();
  const product = useAppSelector((state) => state.products.product);
  const { fields, append, remove } = useFieldArray({
    control,
    keyName: "fieldId",
    name: "array_images",
    rules: {
      required: true,
      validate: (value) => {
        return value.length >= 1;
      },
    },
  });

  const watchImages = watch("array_images");
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
    if (isCreating && isResourceSuccess && dataResource && dataResource.data) {
      const images = getValues("images");
      const arrayImages = getValues("array_images");

      const { id, urls } = dataResource.data;
      const location = arrayImages.length + 1;

      append({ id, url: urls.small! });
      setValue("images.attach", [...images.attach, { id, location }]);
      setIsCreating(false);
    }
  }, [isCreating, isResourceSuccess, dataResource]);

  useEffect(() => {
    if (
      isEditing &&
      dataResource?.data &&
      resourceToEdit &&
      isResourceSuccess
    ) {
      const { index } = resourceToEdit;
      const images = getValues("images");
      const arrayImages = getValues("array_images");

      const { id, urls } = dataResource.data;
      const { id: previousId } = arrayImages?.[index] || {};

      setValue(`array_images.${index}.id`, id);
      setValue(`array_images.${index}.url`, urls.small!);

      setValue(`images.attach`, [
        ...images.attach,
        { id, location: index + 1 },
      ]);
      setValue(`images.detach`, [...images.detach, previousId]);

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
          <div style={{ marginTop: 8 }}>
            {translate("common.placeholder.image")}
          </div>
        </>
      )}
    </div>
  );

  const handleRemove = (index: number, id: number) => {
    remove(index);
    if (product) {
      const images = getValues("images");
      const attachedImages = images.attach;
      const detachedImages = images.detach;

      if (!attachedImages.find((image) => image.id === id)) {
        setValue("images.detach", [...detachedImages, id]);
      }
    }
  };

  const controlledFields = fields.map((field, index) => ({
    ...field,
    ...watchImages[index],
  }));

  return (
    <CustomCard title={translate("products.list.productImage")}>
      {controlledFields.map((field, index) => (
        <Controller
          control={control}
          key={field.fieldId}
          name={`array_images.${index}`}
          render={() => (
            <CustomBadge
              count={
                index === 0 ? (
                  <Space className="button-badge__button--checked">
                    <CheckOutlined />
                  </Space>
                ) : (
                  <Button
                    onClick={() => handleRemove(index, field.id)}
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
                      <div style={{ marginTop: 8 }}>
                        {translate("common.updating")}
                      </div>
                    </>
                  ) : (
                    <img
                      src={field.url}
                      alt={translate("common.alt.productmedia")}
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
      {errors.array_images?.root?.type === "required" && (
        <Space className="custom-card__footer--text" size={1}>
          <Text type="danger">
            {errors.array_images?.root?.message ||
              `* ${translate(
                "products.list.messages.success.validation.requireImage"
              )}`}
          </Text>
        </Space>
      )}
    </CustomCard>
  );
};
