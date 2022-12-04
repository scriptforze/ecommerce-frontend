import "styled-components";
import { theme } from "./theme";

type ThemeInterface = typeof theme;

// and extend them!
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeInterface {}
}
