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

function InformacionAlumno({URLAPI, user, setError, setOk}) {

    const [data, setData] = useState();

    const handleSubmitInfo = async (event) => {
        setError(false)
        setOk(false)

        const obj = data
        for (let i = 0; i < event.target.length-1; i++) {
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

        const response = await fetch(URLAPI+"/estudiantes/", options)
        const json = await response.json()
        if(!response.ok)
            setError(json.message)
        else
            setOk(true)
    };

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    Authorization: `Bearer ${user.token}`
                },
            };
            const response = await fetch(URLAPI + "/estudiantes/" + user.idUserType, options);
            const json = await response.json()
            if(!response.ok)
                setError(json.message)
            else{
                setData(json)
            }
        }
        fetchData()
    }, [])

    return (
        <>
                {data && 
                    <Form onSubmit={handleSubmitInfo}>
                        <h3>Informacion Personal</h3>
                        <p><b>Carrera: </b>{user?.career}</p>
                        <p><b>Generacion: </b>{user?.generation}</p>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="NumeroControl">
                                    <Form.Label>Numero Control</Form.Label>
                                    <Form.Control
                                        disabled
                                        type="text"
                                        defaultValue={data?.NumeroControl}
                                    />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="Nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    defaultValue={data?.Nombre}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="ApellidoPaterno">
                                <Form.Label>Apellido Paterno</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    defaultValue={data?.ApellidoPaterno}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="ApellidoMaterno">
                                <Form.Label>Apellido Materno</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    defaultValue={data?.ApellidoMaterno}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="Nacimiento">
                                <Form.Label>Nacimiento</Form.Label>
                                <Form.Control
                                    required
                                    type="date"
                                    defaultValue={data?.Nacimiento}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="Sexo">
                                <Form.Label>Sexo</Form.Label>
                                <Form.Select defaultValue={data?.Sexo}>
                                    <option value="M">Mujer</option>
                                    <option value="H">Hombre</option>
                                    <option value="I">Indefinido</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="RFC">
                                <Form.Label>RFC</Form.Label>
                                <Form.Control
                                    //required
                                    type="text"
                                    defaultValue={data?.RFC}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="ESC">
                                <Form.Label>ESC</Form.Label>
                                <Form.Control
                                    //required
                                    type="number"
                                    defaultValue={Number(data?.ESC)}
                                />
                            </Form.Group>
                        </Row>
                        <Button variant="primary" type="submit">
                            Editar
                        </Button>
                    </Form>
                }
        </>
    )
}

export { InformacionAlumno }