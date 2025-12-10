import { useState } from "react";
import "./App.css";
import {Navbar, Container, Nav} from 'react-bootstrap'
import data from "./db/fruit";
import Products from "./components/Products";
import { Routes, Route, useNavigate} from 'react-router-dom';
import Detail from "./components/Detail";
import NotFound from "./components/NotFound";
import About from "./components/About";
import Member from "./components/Member";
import Location from "./components/Location";

function App() {

  const [fruit] = useState(data);
  const navigate = useNavigate();

  console.log(fruit);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">과일농장</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/')}}>홈으로</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail')}}>상세페이지</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>장바구니</Nav.Link> 
            <Nav.Link onClick={() => { navigate('/about') }}>회사소개</Nav.Link> 
          </Nav>
        </Container>
      </Navbar>
    
      <Routes>
          <Route path="/" element={<div>
            <div className="slider"></div>
              <div className="container" style={{textAlign:"center"}}>
              <div className="row">                    
              {
                  fruit.map((fruit) =>  
                  <Products {...fruit} key={fruit.id} />)
                }
              </div>
              </div>
          </div> } />
          
          <Route path="/detail/:paramId" element={<Detail fruit = {fruit} />} />
          
          <Route path="/about" element={<About />} >
            <Route path="member" element={<Member />} />
            <Route path="location" element={<Location />} />
          </Route>


          <Route path="/*" element={ <NotFound /> } />      
        </Routes>
    </div>
  );
}


export default App;
