import { Button, Space, Upload } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  CustomCard,
  CustomBadge,
} from "@/modules/products/components/StoreProductStepsForms/GeneralStepForm/styled";
import {
  StoreResourceDto,
  useSaveResourceMutation,
} from "@/services/resources";
import { CustomStoreProductDto } from "../../StoreProductStepsForms/GeneralStepForm/types";

export const ImagesGroup = () => {
  const [imageAtLocation, setImageAtLocation] = useState<{
    [key: number]: string;
  }>({});
  const { control, setValue } = useFormContext<CustomStoreProductDto>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
    rules: {
      required: true,
      validate: (value) => {
        return value.length >= 1;
      },
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [resourceToEdit, setResourceToEdit] = useState<{
    url: string;
    location: number;
    resourceId: number;
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
    if (isCreating && isResourceSuccess && dataResource) {
      const { id: resourceId = 0, urls } = dataResource.data || {};
      const { small = "" } = urls || {};
      const location = fields.length + 1;

      append({ resourceId, url: small, location });
      setImageAtLocation((current) => ({ ...current, [location]: small }));

      setIsCreating(false);
    }
  }, [isCreating, isResourceSuccess, dataResource]);

  useEffect(() => {
    if (isEditing && resourceToEdit && isResourceSuccess && dataResource) {
      const { id: resourceId = 0, urls } = dataResource.data || {};
      const { small = "" } = urls || {};
      const { location } = resourceToEdit;

      setValue(`images.${location - 1}.url`, small);
      setValue(`images.${location - 1}.resourceId`, resourceId);
      setImageAtLocation((current) => ({ ...current, [location]: small }));

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

  return (
    <CustomCard title="Product Images">
      {fields.map((field, index) => (
        <CustomBadge
          key={field.id}
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
              id="image1"
              multiple={false}
              showUploadList={false}
              listType="picture-card"
              customRequest={async (options) => {
                setIsEditing(true);
                const formData = new FormData();
                formData.append("file", options.file);

                const { location, url, resourceId } = field;
                setResourceToEdit({ resourceId, location, url });

                await saveResource({
                  storeResourceDto: formData as unknown as StoreResourceDto,
                });
              }}
            >
              {isEditing &&
              isResourceLoading &&
              resourceToEdit?.location === field.location ? (
                <>
                  <LoadingOutlined />
                  <div style={{ marginTop: 8 }}>Updating</div>
                </>
              ) : (
                <img
                  alt="category"
                  src={imageAtLocation?.[field.location]}
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
                  storeResourceDto: formData as unknown as StoreResourceDto,
                });
              }}
            >
              {UploadButton}
            </Upload>
          </Space>
        </Space>
      )}
      <Space className="custom-card__footer--text" size={1}>
        <p>&nbsp; Select at least one picture</p>
      </Space>
    </CustomCard>
  );
};
