import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";

import Sidebar from "./components/Sidebar/Sidebar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Orders from "./pages/orders/Orders";
import Restaurents from "./pages/restaurents/Restaurents";
import Menu from "./pages/Menu/Menu";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> 

        <div className="app" >

          <Sidebar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<List />} />
              <Route path="/restaurents" element={<Restaurents />} />
              <Route path="/menus/:name/:id" element={<Menu />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
