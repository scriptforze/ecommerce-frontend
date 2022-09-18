import "@/assets/styles/index.less";
import { GlobalStyle } from "./GlobalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./modules/common/layout/AdminLayout";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route index element={<AdminLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
