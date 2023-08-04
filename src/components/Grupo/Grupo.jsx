import { Navbar } from "../Navbar/Navbar"
import { Header } from "../Header/Header"
import '/public/css/style_form.css'
import { Container } from "../Container/Container";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { useNavigate, useParams } from "react-router-dom";

function Grupo() {
    const [group, setGroup] = useState([])
    const [students, setStudents] = useState([])
    const [career, setCareer] = useState([])

    const [error, setError] = useState()
    const navigate = useNavigate()
    const { idGroup } = useParams()

    const { URLAPI } = useAuth()

    useEffect(() => {
        const fetchStudents = async () => {

            // debugger;

            const options = {
                method: "GET",
                headers: {
                    Accept: "*/*",
                },
                credentials: "include"
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

        fetchStudents()
    }, [])

    return (
        <>
            <Container>
                <Header />
                <div className="container">

                    <div className="">
                        <p><b>Genaracion:</b> {group?.generacion}</p>
                        <p><b>Carrera:</b> {career?.nombre}</p>
                    </div>

                    <table className="table table-hover table-striped text-center">
                        <thead>
                            <tr>
                                <th scope="col">Numero de Control</th>
                                <th scope="col">Apellido Paterno</th>
                                <th scope="col">Apellidos Materno</th>
                                <th scope="col">Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                students.map((student, i) => {
                                    return (
                                        <tr onClick={()=>navigate("/estudiante/resultados/" + student.idEstudiante)} key={i}>
                                            <th scope="row">{student.NumeroControl}</th>
                                            <td>{student.ApellidoPaterno}</td>
                                            <td>{student.ApellidoMaterno}</td>
                                            <td>{student.Nombre}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </Container>
            <Navbar />
        </>
    )
}

export { Grupo }