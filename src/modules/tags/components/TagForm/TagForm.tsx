import { Controller, useForm } from "react-hook-form";
import { Button, Card, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import {
  StoreTagRequest,
  useSaveTagMutation,
  useUpdateTagMutation,
} from "@/services/tags";
import { FormItem } from "@/modules/common/components";
import { pushNotification } from "@/modules/common/helpers";
import { TagsRoutesList } from "@/modules/tags/routes";
import { TagFormProps } from "./types";

export const TagForm = ({ tag }: TagFormProps) => {
  const { Text } = Typography;
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<StoreTagRequest>({
    defaultValues: {
      name: tag?.name || "",
    },
  });

  const [storeTag, { isLoading: isSaveTagLoading }] = useSaveTagMutation();
  const [updateTag, { isLoading: isUpdateTagLoading }] = useUpdateTagMutation();

  const onRequestSuccess = () => {
    const action = `${!tag ? "Created" : "Updated"}`;
    pushNotification({
      type: "success",
      title: `Tag ${action}`,
      message: `Tag ${action.toLowerCase()} successfully`,
    });

    navigate(TagsRoutesList.TAGS);
  };

  const onSubmit = (data: StoreTagRequest) => {
    if (!tag) {
      storeTag({ storeTagRequest: data }).unwrap().then(onRequestSuccess);
    } else {
      const updateRequest = { tag: tag.id, updateTagRequest: data };
      updateTag(updateRequest).unwrap().then(onRequestSuccess);
    }
  };

  return (
    <Card>
      <Form
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit(onSubmit)}
      >
        <FormItem label="Name:" required>
          <Controller
            name="name"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Tag name is required",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input
                  status={error && "error"}
                  placeholder="Name of the tag"
                  {...field}
                />
                <Text type="danger">{error?.message} &nbsp;</Text>
              </>
            )}
          />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            style={{ float: "right" }}
            loading={isSaveTagLoading || isUpdateTagLoading}
          >
            {!tag ? "Save" : "Update"}
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
};
