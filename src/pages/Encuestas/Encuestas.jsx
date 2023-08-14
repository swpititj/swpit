import { Navbar } from "./../../components/Navbar/Navbar"
import { Header } from "./../../components/Header/Header"
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { Container } from "./../../components/Container/Container";
import '/public/css/style_form.css'

import { IoIosBody } from 'react-icons/io';

function Encuestas() {
    const [surveys, setSurveys] = useState(null)
    const { URLAPI, user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSurveys = async () => {
            const options = {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    Authorization: `Bearer ${user.token}`
                },
            };
            const res = await fetch(URLAPI + "/encuestas/", options);
            const json = await res.json();
            setSurveys(json);
        }
        fetchSurveys()
    }, [])

    return (
        <>
            <Container>
                <Header />
                <div className="cardBox">
                    {surveys === null ?
                        <p>...waiting</p>
                        :
                        surveys.map((survey, i) => (
                            <div className="card" key={i}>
                                <div onClick={() => navigate("/encuesta/" + survey.idEncuesta)}>
                                    <div className="numbers">{survey.idEncuesta}</div>
                                    <div className="cardName">{survey.Nombre}</div>
                                </div>
                                <NavLink to={"/resultados/" + survey.Nombre + "/" + survey.idEncuesta} className="text-secondary">Resultado</NavLink>
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

export { Encuestas }