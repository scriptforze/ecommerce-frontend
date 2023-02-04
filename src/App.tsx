import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle";
import { AppRouter } from "./router";
import { store } from "./store";
import { theme } from "./theme";
import { GlobalThemeProvider } from "@/modules/common/components/GlobalThemeProvider";

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <GlobalThemeProvider theme={theme}>
        <HashRouter>
          <AppRouter />
        </HashRouter>
      </GlobalThemeProvider>
    </Provider>
  );
};

export default App;
