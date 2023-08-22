import { Container } from "./../../components/Container/Container"
import { Header } from "./../../components/Header/Header"
import { Navbar } from "./../../components/Navbar/Navbar"
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useAuth } from "../../hooks/auth";
import { Alert } from "react-bootstrap";
import { InformacionAlumno } from "./InformacionAlumno";
import { InformacionPersonal } from "./InformacionPersonal";
import { useNavigate } from "react-router-dom";

function Informacion() {
    const { URLAPI, user, setUser } = useAuth()
    const [error, setError] = useState();
    const [ok, setOk] = useState(false);
    const navigate = useNavigate()

    const handleSubmitAccess = async (event) => {
        setError(false)
        setOk(false)

        const obj = user
        for (let i = 0; i < event.target.length - 1; i++) {
            obj[event.target[i].id] = event.target[i].value
        }
        const options = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(obj)
        }

        const response = await fetch(URLAPI + "/usuarios/", options)
        const json = await response.json()
        if (!response.ok)
            setError(json.message)
        else {
            setUser(null)
            localStorage.clear()
            navigate('/', { state: { isLogout: true } })
        }
    };

    return (
        <>
            <Container>
                <Header />
                {error &&
                    <div className="container">
                        <Alert key='danger' variant='danger'>
                            {error}
                        </Alert>
                    </div>
                }
                {ok &&
                    <div className="container">
                        <Alert key='success' variant='success'>
                            Informacion actualizada
                        </Alert>
                    </div>
                }
                <div className="container">


                    {user.userType === 'alumno' &&
                        <InformacionAlumno URLAPI={URLAPI} user={user} setError={setError} setOk={setOk} />
                    }
                    {user.userType === 'docente' &&
                        <InformacionPersonal URLAPI={URLAPI} user={user} setError={setError} setOk={setOk} />
                    }

                    <br></br>
                    <Form onSubmit={handleSubmitAccess}>
                        <h3>Informacion de Acceso</h3>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="Nombre">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    defaultValue={user?.username}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="Correo">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    defaultValue={user?.mail}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="ClaveVieja">
                                <Form.Label>Contraseña Actual</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    defaultValue=''
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="ClaveNueva">
                                <Form.Label>Nueva Contraseña</Form.Label>
                                <Form.Control
                                    //required
                                    type="password"
                                    defaultValue=''
                                />
                            </Form.Group>
                        </Row>
                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                    </Form>
                </div>
            </Container>
            <Navbar />
        </>
    )
}

export { Informacion }