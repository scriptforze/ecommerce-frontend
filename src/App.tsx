import "@/assets/styles/index.less";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle";
import { AppRouter } from "./router";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
