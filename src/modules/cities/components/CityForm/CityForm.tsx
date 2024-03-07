import { Button, Card, Col, Form, Input, Row, Select, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormItem } from "@/modules/common/components";
import { useGetAllCountriesQuery } from "@/services/countries";
import { useGetAllStatesQuery } from "@/services/states";
import { CityFormProps, CustomCityRequest } from "./types";
import { pushNotification } from "@/modules/common/helpers";
import { CitiesRoutesList } from "@/modules/cities/routes";
import { useLangTranslation } from "@/modules/common/hooks";
import { useSaveCityMutation, useUpdateCityMutation } from "@/services/cities";

export const CityForm = ({ city }: CityFormProps) => {
  const { translate } = useLangTranslation();
  const { Text } = Typography;
  const navigate = useNavigate();
  const [country, setCountry] = useState<number | null>(city ? 47 : null);
  const { control, handleSubmit } = useForm<CustomCityRequest>({
    defaultValues: {
      name: city?.name,
      country_id: city && 47,
      state_id: city?.state?.id,
    },
  });

  const { data: countries, isFetching: isCountriesLoading } =
    useGetAllCountriesQuery({ perPage: 100 });

  const { data: states, isFetching: isStatesLoading } = useGetAllStatesQuery(
    {
      perPage: 100,
    },
    { skip: !country }
  );

  const onSuccess = () => {
    pushNotification({
      type: "success",
      title: `${translate("common.columns.city")} ${city ? translate("common.updated") : translate("common.created")
        }`,
      message: `${translate("common.columns.city")} ${city ? translate("common.updated") : translate("common.created")
        } ${translate("common.successfully")}`,
    });

    navigate(CitiesRoutesList.CITIES);
  };

  const [saveCity, { isLoading: isSaveCityLoading }] = useSaveCityMutation();
  const [updateCity, { isLoading: isUpdateCityLoading }] =
    useUpdateCityMutation();

  const onSubmit = (data: CustomCityRequest) => {
    if (city) {
      updateCity({ city: city.id, updateCityRequest: { ...data } })
        .unwrap()
        .then(onSuccess);
    } else {
      saveCity({ storeCityRequest: data }).unwrap().then(onSuccess);
    }
  };

  return (
    <Card>
      <Form
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit(onSubmit)}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Controller
              control={control}
              name="country_id"
              rules={{
                required: {
                  value: true,
                  message: translate("zones.form.validation.countryRequired"),
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label={`${translate("zones.list.country")}:`}
                  required
                >
                  <Select
                    fieldNames={{
                      value: "id",
                      label: "name",
                    }}
                    status={error && "error"}
                    options={countries?.data}
                    disabled={isCountriesLoading}
                    placeholder={translate(
                      "zones.form.title.labels.placeholder.selectCountry"
                    )}
                    onChange={(value) => {
                      field.onChange(value);
                      setCountry(value);
                    }}
                    value={countries?.data?.length ? field.value : undefined}
                  />
                  <Text type="danger">{error?.message} &nbsp;</Text>
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              name="state_id"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: translate("zones.form.validation.stateRequired"),
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label={`${translate("common.columns.status")}:`}
                  required
                >
                  <Select
                    fieldNames={{
                      value: "id",
                      label: "name",
                    }}
                    options={states?.data}
                    status={error && "error"}
                    loading={isStatesLoading}
                    placeholder={translate(
                      "zones.form.title.labels.placeholder.selectState"
                    )}
                    disabled={isStatesLoading || !country}
                    onChange={(value) => field.onChange(value)}
                    value={states?.data?.length ? field.value : undefined}
                  />
                  <Text type="danger">{error?.message} &nbsp;</Text>
                </FormItem>
              )}
            />
          </Col>
        </Row>
        <Controller
          name="name"
          control={control}
          rules={{
            required: {
              value: true,
              message: translate("zones.form.validation.stateName"),
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <FormItem label={`${translate("common.columns.name")}:`} required>
              <Input
                {...field}
                placeholder={translate(
                  "zones.form.title.labels.placeholder.enterName"
                )}
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
            loading={isSaveCityLoading || isUpdateCityLoading}
          >
            {city
              ? translate("common.submit.update")
              : translate("common.submit.create")}
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
};
