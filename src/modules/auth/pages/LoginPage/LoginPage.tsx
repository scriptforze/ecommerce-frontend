import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { FormItem } from "@/modules/common/components/Form";
import { LOGIN_DEFAULT } from "./constants";
import { LoginAuthRequest, useSignInMutation } from "@/services/auth";
import { useAppDispatch } from "@/modules/common/hooks";
import { InitialAuthState, login, logout } from "../../store";

const { Text, Title } = Typography;

export const LoginPage = () => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm<LoginAuthRequest>({
    mode: "onChange",
    defaultValues: LOGIN_DEFAULT,
  });

  const [signIn, { data: signInData, error: signInError }] =
    useSignInMutation();

  useEffect(() => {
    if (signInData) {
      dispatch(login({ token: signInData.access_token }));
    }
  }, [signInData]);

  useEffect(() => {
    if (signInError && "data" in signInError) {
      dispatch(logout({ errorMessage: signInError.data } as InitialAuthState));
    }
  }, [signInError]);

  const onSignIn = async ({ username, password }: LoginAuthRequest) => {
    await signIn({ loginAuthRequest: { password, username } }).unwrap();
  };

  return (
    <>
      <Title level={2}>Login</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSignIn)}>
        <FormItem label="Username or E-mail" name="username">
          <Controller
            control={control}
            name="username"
            rules={{
              required: {
                value: true,
                message: "Username or E-mail is required",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input status={error && "error"} id="username" {...field} />
                <Text type="danger">{error?.message} &nbsp;</Text>
              </>
            )}
          />
        </FormItem>
        <FormItem label="Password" name="password">
          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Password is required",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input.Password
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  id="password"
                  type="password"
                  status={error && "error"}
                  {...field}
                />
                <Text type="danger">{error?.message} &nbsp;</Text>
              </>
            )}
          />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </FormItem>
      </Form>
    </>
  );
};
