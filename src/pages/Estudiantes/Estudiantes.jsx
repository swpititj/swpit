import { Navbar } from "./../../components/Navbar/Navbar"
import { Header } from "./../../components/Header/Header"
import '/public/css/style_form.css'
import { Container } from "./../../components/Container/Container";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";

function Estudiantes() {
    const [students, setStudents] = useState([])
    const [error, setError] = useState()
    const navigate = useNavigate()


    const { URLAPI } = useAuth()

    useEffect(() => {
        const fetchStudents = async () => {

            // debugger;

            const options = {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    Authorization: `Bearer ${user.token}`
                },
            };

            const res = await fetch(URLAPI + "/estudiantes", options)
            const json = await res.json();

            if (!res.ok) {
                setError(true)
            } else {
                setStudents(json)
            }
        }

        fetchStudents()
    }, [])

    return (
        <>
            <Container>
                <Header />
                <div className="container">

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

export { Estudiantes }