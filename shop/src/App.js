import { useState } from "react";
import "./App.css";
import {Navbar, Container, Nav, Button} from 'react-bootstrap'
import data from "./db/fruit";
import Products from "./components/Products";
import { Routes, Route, useNavigate} from 'react-router-dom';
import Detail from "./components/Detail";
import NotFound from "./components/NotFound";
import About from "./components/About";
import Member from "./components/Member";
import Location from "./components/Location";
import Title from "./components/Title";
import Title2 from "./components/Title2";
import data2 from "./db/veggie";
import ComVeggie from "./components/ComVeggie";
import Footer from "./components/Footer";
import axios from 'axios'
import Cart from "./components/Cart";

function App() {

  const [fruit, setFruit] = useState(data);
  let [veggie, setVeggie] = useState(data2);
  let [count, setCount] = useState(1);
  const navigate = useNavigate();

  const sortByName = () => {
    let sortedFruit = [...fruit].sort((a, b) => (a.title > b.title ? 1 : -1));
    setFruit(sortedFruit);    
  };

  const sortByPriceLowToHigh = () => {
    let sortedFruit = [...fruit].sort((a, b) => a.price - b.price);
    setFruit(sortedFruit);    
  };

  const sortByPriceHighToLow = () => {
    let sortedFruit = [...fruit].sort((a, b) => b.price - a.price);
    setFruit(sortedFruit);    
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={()=> navigate("/")}>과일농장</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/')}}>홈으로</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail/1')}}>상세페이지</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>장바구니</Nav.Link> 
            <Nav.Link onClick={() => { navigate('/about') }}>회사소개</Nav.Link> 
          </Nav>
        </Container>
      </Navbar>
    
      <Routes>
          <Route path="/" element={
            <div>            
              <div className="slider"></div>
              <Title />
              <div className="container">
                <div className="row">
                  <div style={{ textAlign: "center" }}>
                    <Button className="me-2" variant="outline-primary" onClick={sortByName}>이름순 정렬</Button>
                    <Button className="me-2" variant="outline-secondary" onClick={sortByPriceLowToHigh}>낮은가격순 정렬</Button>
                    <Button variant="outline-success" onClick={sortByPriceHighToLow}>높은가격순 정렬</Button>
                  </div>
                  </div>
              </div>
              <div className="container" style={{marginTop:'30px'}}>
                <div className="row">                    
                  {
                    fruit.map((fruit) =>  
                      <Products {...fruit} key={fruit.id} />
                    )
                  }
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <div style={{ textAlign: "center" }}>
                      <Title2 />
                      <Button variant="outline-success"
                        count = {count} onClick={() => {
                        if(count==1){
                          axios.get('https://sinaboro.github.io/react_data/veggie2.json').
                            then((result)=>{
                                let copy6 =[...veggie, ...result.data];
                                setVeggie(copy6);
                                setCount(count + 1);
                        
                            }).catch( () => {
                                alert("주소가 잘못되었습니다.")
                                setCount(count + 1)
                            }
                            )
                        }else if(count==2){
                          axios.get('https://sinaboro.github.io/react_data/veggie3.json').then((result)=>{
                            let copy9 =[...veggie, ...result.data];
                            setVeggie(copy9);
                            setCount(count + 1);
                            })   
                        }else if(count>=3){
                          alert("더이상 상품이 없습니다.");  
                        }
                      }}
                      > + 3개 상품 더 보기 </Button> 
                  </div>
                  </div>
              </div>

              <div className="container mt-3">
                <div className="row">
                  {veggie.map((item) => (
                    <ComVeggie {...item} key={item.id} />
                  ))}
                </div>
              </div>
              <Footer /> 
            </div> 
          } />
        
          <Route path="/detail/:paramId" element={<Detail fruit = {fruit} />} />          
          <Route path="/cart" element={<Cart />}/>
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
