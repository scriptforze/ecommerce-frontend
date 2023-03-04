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
import { useSaveCityMutation, useUpdateCityMutation } from "@/services/cities";

export const CityForm = ({ city }: CityFormProps) => {
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
      title: `City ${city ? "updated" : "created"}`,
      message: `City ${city ? "updated" : "created"} successfully`,
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
                  message: "The country is required",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Country:" required>
                  <Select
                    fieldNames={{
                      value: "id",
                      label: "name",
                    }}
                    status={error && "error"}
                    options={countries?.data}
                    disabled={isCountriesLoading}
                    placeholder="Select a country"
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
                  message: "The state is required",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <FormItem label="State:" required>
                  <Select
                    fieldNames={{
                      value: "id",
                      label: "name",
                    }}
                    options={states?.data}
                    status={error && "error"}
                    loading={isStatesLoading}
                    placeholder="Select a state"
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
          rules={{ required: { value: true, message: "The name is required" } }}
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Name:" required>
              <Input {...field} placeholder="Enter name" />
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
            {city ? "Update" : "Save"}
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
};
