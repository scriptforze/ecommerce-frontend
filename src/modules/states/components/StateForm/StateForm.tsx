import { Controller, useForm } from "react-hook-form";
import { Button, Card, Form, Input, Select, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useLangTranslation } from "@/modules/common/hooks";
import {
  StoreStateRequest,
  useSaveStateMutation,
  useUpdateStateMutation,
} from "@/services/states";
import { FormItem } from "@/modules/common/components";
import { useGetAllCountriesQuery } from "@/services/countries";
import { StateFormProps } from "./types";
import { pushNotification } from "@/modules/common/helpers";
import { StatesRoutesList } from "@/modules/states/routes";

export const StateForm = ({ state }: StateFormProps) => {
  const { translate } = useLangTranslation();
  const { Text } = Typography;
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<StoreStateRequest>({
    defaultValues: {
      name: state?.name,
      country_id: state?.country?.id,
    },
  });
  const { data: countries, isFetching: isCountriesLoading } =
    useGetAllCountriesQuery({ perPage: 100 });

  const [saveState, { isLoading: isSaveStateLoading }] = useSaveStateMutation();
  const [updateState, { isLoading: isUpdateStateLoading }] =
    useUpdateStateMutation();

  const onSuccess = () => {
    pushNotification({
      type: "success",
      title: `${translate("common.columns.status")} ${state ? translate("common.updated") : translate("common.created")
        }`,
      message: `${translate("common.columns.status")} ${state ? translate("common.updated") : translate("common.created")
        } ${translate("common.successfully")}`,
    });

    navigate(StatesRoutesList.STATES);
  };

  const onSubmit = (data: StoreStateRequest) => {
    if (state) {
      updateState({ state: state.id, updateStateRequest: { ...data } })
        .unwrap()
        .then(onSuccess);
    } else {
      saveState({ storeStateRequest: data }).unwrap().then(onSuccess);
    }
  };

  return (
    <Card>
      <Form
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit(onSubmit)}
      >
        <Controller
          name="country_id"
          control={control}
          rules={{
            required: {
              value: true,
              message: translate("zones.form.validation.countryRequired"),
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <FormItem label={`${translate("zones.list.country")}:`} required>
              <Select
                fieldNames={{
                  value: "id",
                  label: "name",
                }}
                status={error && "error"}
                options={countries?.data}
                placeholder={translate(
                  "zones.form.title.labels.placeholder.selectCountry"
                )}
                onChange={(value) => field.onChange(value)}
                disabled={isCountriesLoading || !countries?.data?.length}
                value={countries?.data?.length ? field.value : undefined}
              />
              <Text type="danger">{error?.message} &nbsp;</Text>
            </FormItem>
          )}
        />
        <Controller
          name="name"
          control={control}
          rules={{
            required: {
              value: true,
              message: translate("zones.form.validation.name"),
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <FormItem
              label={`${translate("zones.form.title.stateName")}:`}
              required
            >
              <Input
                placeholder={translate(
                  "zones.form.title.labels.placeholder.enterStateName"
                )}
                status={error && "error"}
                {...field}
              />
              <Text type="danger">{error?.message} &nbsp;</Text>
            </FormItem>
          )}
        />
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            style={{ float: "right" }}
            loading={isSaveStateLoading || isUpdateStateLoading}
          >
            {state
              ? translate("common.submit.update")
              : translate("common.submit.create")}
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
};
