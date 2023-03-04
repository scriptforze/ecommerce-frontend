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
import { CountriesRoutesList } from "@/modules/countries/routes";

export const CountryForm = ({ country }: CountryFormProps) => {
  const { Text } = Typography;
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
      title: `Country ${country ? "updated" : "created"}`,
      message: `Country ${country ? "updated" : "created"} successfully`,
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
              message: "The name is required",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Name:" required>
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
              message: "The phone code is required",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Phone code:" required>
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
              message: "The short name is required",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Short Name:" required>
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
            {country ? "Update" : "Save"}
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
};
