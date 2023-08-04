import { Navbar } from "../Navbar/Navbar"
import { Header } from "../Header/Header"
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { Container } from "../Container/Container";
import '/public/css/style_form.css'

import { IoIosBody } from 'react-icons/io';

function Grupos() {
    const [groups, setGroups] = useState(null)
    const { URLAPI } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchGroups = async () => {
            const options = {
                method: "GET",
                headers: {
                    Accept: "*/*",
                },
                credentials: "include"
            };
            const res = await fetch(URLAPI + "/grupos", options);
            const json = await res.json();
            setGroups(json);
        }
        fetchGroups()
    }, [])

    return (
        <>
            <Container>
                <Header />
                <div className="cardBox">
                    {groups === null ?
                        <p>...waiting</p>
                        :
                        groups.map((group, i) => (
                            <div className="card" key={i}>
                                <div onClick={() => navigate("/grupo/" + group.idSalon)}>
                                    <div className="numbers">{group.generacion}</div>
                                    <div className="cardName">{group.Carrera.nombre}</div>
                                </div>
                                {/* <div className="iconBx"><IoIosBody/></div> */}
                            </div>
                        ))
                    }
                </div>
            </Container>
            <Navbar />
        </>
    )
}

export { Grupos }