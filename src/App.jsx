import { useEffect, useState } from 'react'
import { Card, Container ,Col,Row, Nav, Navbar} from 'react-bootstrap';
import './App.css'
import {NEWS} from "./news";
import LOGO from "./assets/logo.png"

function App() {
  const [category,setCategory]=useState("business");
  const [news,setNews]=useState([]);

  const getNews=async()=>{
    const res=await fetch(`https://newsdata.io/api/1/news?apikey=pub_1586642de0b2bce5a7b07f566bc69ce9cb7f5&country=ke&category=${category}`);
     const {results}=await res.json();
     setNews(results);
  }


    useEffect(()=>{
      // setNews(NEWS)
          getNews();
    },[category])



  return (
    <div className='body'>
      <Navbar bg='light' expand="lg" className='mb-3'>
        <Container>
          <Navbar.Brand>
            <img src={LOGO} alt="logo" 
            style={{width:"4rem",height:"3rem"}}/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className='me-auto'>
              <Nav.Link
              onClick={()=>setCategory("business")}>Business</Nav.Link>
              <Nav.Link
               onClick={()=>setCategory("entertainment")}>Entertainment</Nav.Link>
              <Nav.Link
               onClick={()=>setCategory("environment")}>Environment</Nav.Link>
              <Nav.Link
               onClick={()=>setCategory("politics")}>Politics</Nav.Link>
              <Nav.Link
               onClick={()=>setCategory("sports")}>Sports</Nav.Link>
              <Nav.Link
               onClick={()=>setCategory("top")}>Top</Nav.Link>
              <Nav.Link
               onClick={()=>setCategory("world")}>Wolrd</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>  
      <Row  xs={1} md={2} className="g-4">
        {news.length < 1 && (<h3 className='text-center'>No news found!</h3>)}
      {news.map((n)=>(
            <Col>
            <Card style={{height:"20rem"}}>           
               <Card.Body>
                <Card.Title>
                  {n.title}
                </Card.Title>
                <Card.Text>
                  <p className='text_'>{n.description}</p>
                  <div className='text-muted'>
                  <small>Updated: {n.pubDate}</small>
                  <br></br>
                  <small>Source: {n.source_id}</small>
                  </div>
                  <p>
                    <a href={n.link}>Read More...</a>
                  </p>
                </Card.Text>
               </Card.Body>
            </Card>
          </Col>
      ))}    
      </Row>
    </div>
  )
}

export default App
