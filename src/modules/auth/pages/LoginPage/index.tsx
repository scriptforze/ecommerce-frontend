import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { FormItem } from "@/modules/common/components/Form";
import { AuthLayout } from "../../layout/AuthLayout";
import { LOGIN_DEFAULT } from "./consts";
import { LoginData } from "./types";

const { Text } = Typography;

export const LoginPage = () => {
  const { control, handleSubmit } = useForm<LoginData>({
    mode: "onChange",
    defaultValues: LOGIN_DEFAULT,
  });

  const singIn = (data: LoginData) => {
    // TODO: implement singIn function
  };

  return (
    <AuthLayout title="Login">
      <Form layout="vertical" onFinish={handleSubmit(singIn)}>
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
    </AuthLayout>
  );
};
