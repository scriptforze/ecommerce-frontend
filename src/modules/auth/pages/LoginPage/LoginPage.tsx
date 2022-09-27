import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { FormItem } from "@/modules/common/components/Form";
import { LOGIN_DEFAULT } from "./constants";
import { LoginAuthRequest, useSignInMutation } from "@/services/auth";

const { Text, Title } = Typography;

export const LoginPage = () => {
  const { control, handleSubmit } = useForm<LoginAuthRequest>({
    mode: "onChange",
    defaultValues: LOGIN_DEFAULT,
  });
  const [
    signIn,
    { data: signInData, isError: isSignInError, error: signInError },
  ] = useSignInMutation();

  useEffect(() => {
    // TODO: logic to signIn
  }, [signInData]);

  useEffect(() => {
    if (isSignInError) {
      // TODO: logic to show errors
    }
  }, [isSignInError, signInError]);

  const onSignIn = ({ username, password }: LoginAuthRequest) => {
    signIn({ loginAuthRequest: { password, username } });
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
