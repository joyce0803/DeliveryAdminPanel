import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
import List from "./pages/list/List"
import Single from "./pages/single/Single"
import New from "./pages/new/New"

import Sidebar from "./components/Sidebar/Sidebar"
import Topbar from "./components/Topbar/Topbar"
import { ColorModeContext, useMode } from "./theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Orders from "./pages/orders/Orders";

function App() {
  const [theme,colorMode]=useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      
        <CssBaseline />
        
        <div className="app">
        <Sidebar />
        <main className="content">
            <Routes>
              <Route path='/' element={<Home />} />
              {/* <Route path='/login' element={<Login />} /> */}
              <Route path='/users' element={<List />} />
              <Route path='/users/:userId' element={<Single />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/users/new' element={<New />} />
              <Route path='/products' element={<List />} />
              <Route path='/products/:productId' element={<Single />} />
              <Route path='/products/new' element={<New />} />
            </Routes>
            </main>
       
        
            
          
          
        </div>
    </ThemeProvider>  
    </ColorModeContext.Provider>
  );
}

export default App;
