import { ConfigProvider } from "antd";
import { FC } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalThemeProviderProps } from "./types";

export const GlobalThemeProvider: FC<GlobalThemeProviderProps> = ({
  theme,
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </ThemeProvider>
  );
};
