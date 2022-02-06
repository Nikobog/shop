import React, { useContext } from "react";
import { Context } from "..";
import NavBar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container"
import {useNavigate} from 'react-router-dom';

const NavigBar = observer(() => {
    const {user} = useContext(Context)
    console.log(user)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return(
        <NavBar bg="dark" variant="dark">
            <Container>
              <NavbarBrand href={SHOP_ROUTE}>NavBrand</NavbarBrand>
              {user.isAuth ?
                <Nav>
                    <Nav.Link onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Nav.Link>
                    <Nav.Link onClick={() => logOut()}>Выйти</Nav.Link>
                </Nav>
                :
                <Nav>
                    <Nav.Link onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Nav.Link>
                </Nav>
              }
            </Container>
        </NavBar>
        
    )
});

export default NavigBar;