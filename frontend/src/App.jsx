import Login from "./Login"
import {BrowserRouter, Routes , Route, Link} from 'react-router-dom';
import Register from "./Register";
import Home from'./Home';
import Product from "./Product";



function App() {


  return (
    <>
      <div>
     
      <BrowserRouter>
      <Routes>
        <Route path = "/log" element = {<Login/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/" element = {<Home/>}/>
        <Route path= "/product" element = {<Product/>}/>
       </Routes>
       </BrowserRouter>
      </div>
    </>
  )
}

export default App
