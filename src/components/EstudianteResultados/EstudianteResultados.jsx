import { Navbar } from "../Navbar/Navbar"
import { Header } from "../Header/Header"
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Container } from "../Container/Container";
import {ModalResultados} from './ModalResultados';
import '/public/css/style_form.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function EstudianteResultados() {
    const [surveys, setSurveys] = useState(null)
    const [student, setStudent] = useState({})
    const [key, setKey] = useState('info');
    const [show, setShow] = useState(false);
    const [dataSurvey, setDataSurvey] = useState();


    const { idStudent } = useParams()
    const navigate = useNavigate()
    const { URLAPI } = useAuth()

    useEffect(() => {
        const fetchSurveys = async () => {
            const options = {
                method: "GET",
                headers: {
                    Accept: "*/*",
                },
                credentials: "include"
            };
            const res = await fetch(URLAPI + "/encuestas/", options);
            const json = await res.json();
            setSurveys(json);
        }
        const fetchStudent = async () => {
            const options = {
                method: "GET",
                headers: {
                    Accept: "*/*",
                },
                credentials: "include"
            };
            const res = await fetch(URLAPI + "/estudiantes/" + idStudent, options);
            const json = await res.json();
            setStudent(json);
        }
        fetchSurveys()
        fetchStudent()
    }, [])

    return (
        <>
            <Container>
                <Header />
                <Tabs defaultActiveKey="profile" id="fill-tab-example" className="mb-3"  activeKey={key} onSelect={(k) => setKey(k)} fill >
                    <Tab eventKey="info" title="Informacion">
                        <div className="cardBox">
                            <p className="fs-5"><b>Numero Control:</b> {student.NumeroControl}</p>
                            <br />
                            <p className="fs-5"><b>Nombre:</b> {student.Nombre}</p>
                            <br />
                            <p className="fs-5"><b>Apellido Paterno:</b> {student.ApellidoPaterno}</p>
                            <br />
                            <p className="fs-5"><b>Apellido Materno:</b> {student.ApellidoMaterno}</p>
                            <br />
                            <p className="fs-5"><b>Nacimiento:</b> {student.Nacimiento}</p>
                            <br />
                            <p className="fs-5"><b>Sexo:</b> {student.Sexo}</p>
                            <br />
                            <p className="fs-5"><b>RFC:</b> {student.RFC}</p>
                        </div>
                            <div className=""></div>
                    </Tab>
                    <Tab eventKey="results" title="Resultados">
                        <div className="cardBox">
                            {surveys === null ?
                                <p>...waiting</p>
                                :
                                surveys.map((survey, i) => (
                                    <div className="card" key={i} onClick={()=>{
                                        setDataSurvey({...survey, idStudent:idStudent})
                                        setShow(true)
                                        }}>
                                        <div >
                                            <div className="numbers">{survey.idEncuesta}</div>
                                            <div className="cardName">{survey.Nombre}</div>
                                        </div>
                                        {/* <div className="iconBx"><IoIosBody/></div> */}
                                    </div>
                                ))
                            }
                        </div>
                    </Tab>
                    <Tab eventKey="" title="Entrevista" disabled>
                        Tab content for Loooonger Tab
                    </Tab>
                </Tabs>

            </Container>
            <Navbar />
            <ModalResultados show={show} setShow={setShow} dataSurvey={dataSurvey}/>
        </>
    )
}

export { EstudianteResultados }