import { BrowserRouter } from "react-router-dom";
import "@/assets/styles/index.less";
import { AppRouter } from "./router/AppRouter";
import { GlobalStyle } from "./GlobalStyle";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
};

export default App;
