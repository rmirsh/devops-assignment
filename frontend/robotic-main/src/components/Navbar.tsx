import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import "../css/NavbarBanner.css"
import { motion as m } from 'framer-motion'
import { parentNav } from '../animations/animations';
import logoMain from "../assets/Heads/logoMain.svg"

function NavBar() {
  const [isMenuOpenCat, setMenuOpenCat] = useState(false);
  const [isMenuOpenAdd, setMenuOpenAdd] = useState(false);

  const toggleMenuCategories = () => {
    setMenuOpenCat(!isMenuOpenCat);
  };

  const toggleMenuAdd = () => {
    setMenuOpenAdd(!isMenuOpenAdd);
  };

  return (
    <m.div variants={parentNav} className='navbar-main-div' initial="hidden" animate="show" >
    <Navbar collapseOnSelect expand="lg" className="navbar" bg='black'>
      <Container className='navbar-cont'>
        <Navbar.Brand href="/"><img src={logoMain} alt="robotick logo" id='logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav " className='ml-auto'>
          <Nav className='mr-auto'>
          <Nav.Link href="#about">O нас</Nav.Link>
            <NavDropdown title="Направления" show={isMenuOpenCat} onToggle={toggleMenuCategories} className={isMenuOpenCat ? 'rotate custom-nav-dropdown ' : 'custom-nav-dropdown'}>
              <NavDropdown.Item href="#robototechnics">
                Робототехника
              </NavDropdown.Item>
              <NavDropdown.Item href="#programming">Программирование</NavDropdown.Item>
              <NavDropdown.Item href="#gamedevelop">Разработка игр</NavDropdown.Item>
            </NavDropdown>
          <NavDropdown title="Дополнительно" show={isMenuOpenAdd} onToggle={toggleMenuAdd} className={isMenuOpenAdd ? 'rotate' : ''} >
            <NavDropdown.Item href="#oge">Подготовка к ОГЭ</NavDropdown.Item>
            <NavDropdown.Item href="#holidays">
              Проведение праздников
            </NavDropdown.Item>
          </NavDropdown>
   
          <Nav.Link href="#contacts">Контакты</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
    </Navbar >
    </m.div>
  );
}

export default NavBar;