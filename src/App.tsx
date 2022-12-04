import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle";
import GlobalThemeProvider from "./modules/common/components/GlobalThemeProvider/GlobalThemeProvider";
import { AppRouter } from "./router";
import { store } from "./store";
import { theme } from "./theme";

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <GlobalThemeProvider theme={theme}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </GlobalThemeProvider>
    </Provider>
  );
};

export default App;
