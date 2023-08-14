import { Navbar } from "./../../components/Navbar/Navbar"
import { Header } from "./../../components/Header/Header"
import '/public/css/style_form.css'
import { Container } from "./../../components/Container/Container";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import { TableStudent } from "./TableStudent";
import { ModalReports } from "./ModalReports";

function Grupo() {
    //students
    const [group, setGroup] = useState([])
    const [students, setStudents] = useState([])
    const [career, setCareer] = useState([])
    
    //reports
    const [key, setKey] = useState('students');
    const [surveys, setSurveys] = useState(null)
    const [dataSurvey, setDataSurvey] = useState();
    const [show, setShow] = useState(false);
    
    const [error, setError] = useState()

    const { idGroup } = useParams()

    const { URLAPI, user} = useAuth()

    useEffect(() => {
        const fetchStudents = async () => {
            const options = {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    Authorization: `Bearer ${user.token}`
                },
            };

            const res = await fetch(URLAPI + "/grupos/"+idGroup, options)
            const json = await res.json();

            if (!res.ok) {
                setError(true)
            } else {
                setGroup(json)
                setCareer(json.Carrera)
                setStudents(json.Estudiantes)
            }
        }

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
        fetchStudents()
    }, [])

    return (
        <>
            <Container>
                <Header />
                <Tabs  defaultActiveKey="students" id="fill-tab-example" className="mb-3"  activeKey={key} onSelect={(k) => setKey(k)} fill>
                    <Tab eventKey="students" title="Estudiantes">
                        <TableStudent group={group} students={students} career={career}/>
                    </Tab>
                    <Tab eventKey="reports" title="Reportes">
                    <div className="cardBox">
                            {surveys === null ?
                                <p>...waiting</p>
                                :
                                surveys.map((survey, i) => (
                                    <div className="card" key={i} onClick={()=>{
                                        setDataSurvey({...survey, idGroup:idGroup})
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
                </Tabs>
            </Container>
            <Navbar />
            <ModalReports show={show} setShow={setShow} dataSurvey={dataSurvey} studentsLength={students.length}/>
        </>
    )
}

export { Grupo }