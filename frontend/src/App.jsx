import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Nopage from './pages/Nopage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='*' element={<Nopage />}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App