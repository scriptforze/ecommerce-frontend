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
import { useLangTranslation } from "@/modules/common/hooks";

export const TagForm = ({ tag }: TagFormProps) => {
  const { Text } = Typography;
  const navigate = useNavigate();
  const { translate } = useLangTranslation();
  const { control, handleSubmit } = useForm<StoreTagRequest>({
    defaultValues: {
      name: tag?.name || "",
    },
  });

  const [storeTag, { isLoading: isSaveTagLoading }] = useSaveTagMutation();
  const [updateTag, { isLoading: isUpdateTagLoading }] = useUpdateTagMutation();

  const onRequestSuccess = () => {
    const createdTitle = translate("tags.form.messages.success.create.title");
    const createdMessage = translate("tags.form.messages.success.create.msg");
    const updatedTitle = translate("tags.form.messages.success.update.title");
    const updatedMessage = translate("tags.form.messages.success.update.msg");

    const title = tag ? updatedTitle : createdTitle;
    const message = tag ? updatedMessage : createdMessage;

    pushNotification({ type: "success", title, message });
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
        <FormItem label={translate("tags.form.name.label")} required>
          <Controller
            name="name"
            control={control}
            rules={{
              required: {
                value: true,
                message: translate("common.messages.while.validation.tag"),
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input
                  status={error && "error"}
                  placeholder={translate("tags.form.name.placeholder")}
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
            {!tag
              ? translate("tags.form.submit.create")
              : translate("tags.form.submit.update")}
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
};
