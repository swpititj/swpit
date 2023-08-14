import { Navbar } from "./../../components/Navbar/Navbar"
import { Header } from "./../../components/Header/Header"
import '/public/css/style_form.css'
import { Container } from "./../../components/Container/Container";
import { useAuth } from "../../hooks/auth";

function Home() {
    const {user} = useAuth()
    return (
        <>
            <Container>
                <Header />
                <div className="panel panel-default">
                    <div className="panel-body text-center">
                        ¡Bienvenido a SWPIT, {user.name}!
                        <br />
                        <br />
                        <br />
                       {user.userType === 'alumno' &&  "En esta plataforma podras realizar tus encuestas." }
                       {user.userType === 'docente' &&  "En esta plataforma podras revisar las encuestas de tus alumnos." }
                    </div>
                </div>
            </Container>
            <Navbar />
        </>
    )
}

export { Home }