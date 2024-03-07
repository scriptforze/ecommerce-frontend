import { Controller, useForm } from "react-hook-form";
import { Button, Card, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import {
  StoreCountryRequest,
  useSaveCountryMutation,
  useUpdateCountryMutation,
} from "@/services/countries";
import { FormItem } from "@/modules/common/components";
import { CountryFormProps } from "./types";
import { pushNotification } from "@/modules/common/helpers";
import { useLangTranslation } from "@/modules/common/hooks";
import { CountriesRoutesList } from "@/modules/countries/routes";

export const CountryForm = ({ country }: CountryFormProps) => {
  const { Text } = Typography;
  const { translate } = useLangTranslation();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<StoreCountryRequest>({
    mode: "onChange",
    defaultValues: {
      name: country?.name,
      phone_code: country?.phone_code,
      short_name: country?.short_name,
    },
  });

  const onSuccess = () => {
    pushNotification({
      type: "success",
      title: `${translate("zones.list.country")} ${country ? translate("common.updated") : translate("common.created")
        }`,
      message: `${translate("zones.list.country")} ${country ? translate("common.updated") : translate("common.created")
        } ${translate("common.successfully")}`,
    });

    navigate(CountriesRoutesList.COUNTRIES);
  };

  const [updateCountry, { isLoading: isUpdateCountrySuccess }] =
    useUpdateCountryMutation();

  const [saveCountry, { isLoading: isSaveCountryLoading }] =
    useSaveCountryMutation();

  const onSubmit = (data: StoreCountryRequest) => {
    if (country) {
      updateCountry({ country: country.id, updateCountryRequest: { ...data } })
        .unwrap()
        .then(onSuccess);
    } else {
      saveCountry({ storeCountryRequest: data }).unwrap().then(onSuccess);
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
          name="name"
          control={control}
          rules={{
            required: {
              value: true,
              message: translate("common.messages.while.validation.name"),
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <FormItem label={`${translate("common.columns.name")}:`} required>
              <Input status={error && "error"} {...field} />
              <Text type="danger">{error?.message} &nbsp;</Text>
            </FormItem>
          )}
        />
        <Controller
          name="phone_code"
          control={control}
          rules={{
            required: {
              value: true,
              message: translate("common.messages.while.validation.phoneCode"),
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <FormItem
              label={`${translate("common.columns.phoneCode")}:`}
              required
            >
              <Input status={error && "error"} {...field} />
              <Text type="danger">{error?.message} &nbsp;</Text>
            </FormItem>
          )}
        />
        <Controller
          name="short_name"
          control={control}
          rules={{
            required: {
              value: true,
              message: translate("common.messages.while.validation.shortName"),
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <FormItem
              label={`${translate("common.columns.shortName")}:`}
              required
            >
              <Input status={error && "error"} {...field} />
              <Text type="danger">{error?.message} &nbsp;</Text>
            </FormItem>
          )}
        />
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            style={{ float: "right" }}
            loading={isSaveCountryLoading || isUpdateCountrySuccess}
          >
            {country
              ? translate("common.submit.update")
              : translate("common.submit.create")}
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
};
