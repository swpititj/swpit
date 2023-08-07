import { NavLink, useNavigate } from "react-router-dom"
import { IoIosHome, IoIosLogOut, IoIosList } from 'react-icons/io';
import { useAuth } from "../../hooks/auth";
import routes from './NavbarOptions';
import { useState } from "react";
import { ModalExit } from "./ModalExit";


function Navbar() {

    const { logout, setUser, user } = useAuth()
    const [show, setShow] = useState()

    const navigate = useNavigate()

    return (
        <>
        <nav className="navigation-1">
            <ul>
                <li>
                    <NavLink to={"/"}>
                        <span className="banner-img"> <img src="/imgs/halcon.png" alt="" /> </span>
                    </NavLink>
                </li>
                {routes.map(route => {
                    if (route.userType.includes(user.userType))
                        return (<li key={route.text}>
                            <NavLink to={route.to} style={({ isActive }) => isActive ? {
                                // backgroundColor: 'var(--white)',
                                // color: 'var(--blue)'
                            } : {}}>
                                <span className="icon"> {route.icon} </span>
                                <span className="tittle">{route.text}</span>
                            </NavLink>
                        </li>)
                })}
                <li onClick={()=>{setShow(true)}}>
                    <NavLink>
                        <span className="icon"> <IoIosLogOut /> </span>
                        <span className="tittle">Cerrar Sesion</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
        <ModalExit show={show} setShow={setShow}/>
        </>

    )
}

export { Navbar }