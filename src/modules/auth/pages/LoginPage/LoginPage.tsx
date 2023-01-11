import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormItem } from "@/modules/common/components";
import {
  isErrorWithMessage,
  persistLocalStorage,
} from "@/modules/common/helpers";
import { useAppDispatch } from "@/modules/common/hooks";
import { LoginAuthRequest, useSignInMutation } from "@/services/auth";
import { InitialAuthState, login, logout, TOKEN_KEY } from "../../store";
import { ALERT_VISIBILITY_DEFAULT, LOGIN_DEFAULT } from "./constants";
import { StyledAlert } from "./styled";
import { IAlertVisibility } from "./types";

const { Text, Title } = Typography;

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [visibleAlert, setVisibleAlert] = useState<IAlertVisibility>(
    ALERT_VISIBILITY_DEFAULT
  );

  const { control, handleSubmit } = useForm<LoginAuthRequest>({
    mode: "onChange",
    defaultValues: LOGIN_DEFAULT,
  });

  const [signIn, { data: signInData, error: signInError, isLoading }] =
    useSignInMutation();

  useEffect(() => {
    if (signInData) {
      persistLocalStorage<string>(TOKEN_KEY, signInData.access_token!);
      dispatch(login({ token: signInData.access_token } as InitialAuthState));
    }
  }, [signInData]);

  useEffect(() => {
    if (signInError && isErrorWithMessage(signInError)) {
      dispatch(logout());
      if (typeof signInError.data.error === "object") {
        // TODO: set form errors
      } else {
        setVisibleAlert({ isVisible: true, message: signInError.data.error });
      }
    }
  }, [signInError]);

  const onSignIn = ({ username, password }: LoginAuthRequest) => {
    signIn({ loginAuthRequest: { password, username } });
  };

  const handleClose = () => {
    setVisibleAlert({ isVisible: false, message: "" });
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
        {visibleAlert.isVisible && (
          <StyledAlert
            message={visibleAlert.message}
            type="error"
            closable
            afterClose={handleClose}
          />
        )}
        <FormItem>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Sign In
          </Button>
        </FormItem>
      </Form>
    </>
  );
};
