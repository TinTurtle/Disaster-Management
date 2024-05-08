import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Nopage from "./pages/Nopage";
import Login from "./pages/login";
import Register from "./pages/Register";
import LandingPage from "./pages/Landingpage";
import Donation from "./pages/Donation";
import Report from "./pages/Report";
import Createblog from "./pages/Createincident";
import Incident from "./pages/Incident";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/' element={<Layout />}>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/donation' element={<Donation />}></Route>
            <Route path='/report' element={<Report />}></Route>
            <Route path='/create' element={<Createblog />}></Route>
            <Route path='/blog/:id' element={<Incident />}></Route>
            <Route path='*' element={<Nopage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
