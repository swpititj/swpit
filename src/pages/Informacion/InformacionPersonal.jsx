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

function InformacionPersonal({URLAPI, user, setError, setOk}) {

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

        const response = await fetch(URLAPI+"/personal/", options)
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
            const response = await fetch(URLAPI + "/personal/" + user.idUserType, options);
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
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="Nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    defaultValue={data?.Nombre}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="Apellidos">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    defaultValue={data?.Apellidos}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="CorreoPersonal">
                                <Form.Label>Correo Personal</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    defaultValue={data?.CorreoPersonal}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="CorreoInstitucional">
                                <Form.Label>Correo Institucional</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    defaultValue={data?.CorreoInstitucional}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="TelefonoCelular">
                                <Form.Label>Telefono Celular</Form.Label>
                                <Form.Control
                                    required
                                    type="tel"
                                    defaultValue={data?.TelefonoCelular}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="TelefonoCasa">
                                <Form.Label>Telefono Casa</Form.Label>
                                <Form.Control
                                    required
                                    type="tel"
                                    defaultValue={data?.TelefonoCasa}
                                />
                            </Form.Group>
                            
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="Tipo">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control
                                    //required
                                    type="text"
                                    defaultValue={data?.Tipo}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="NT">
                                <Form.Label>NT</Form.Label>
                                <Form.Control
                                    //required
                                    type="text"
                                    defaultValue={data?.NT}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="Direccion">
                                <Form.Label>Direccion</Form.Label>
                                <Form.Control
                                    //required
                                    type="text"
                                    defaultValue={data?.Direccion}
                                />
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
                        </Row>
                        <Button variant="primary" type="submit">
                            Editar
                        </Button>
                    </Form>
                }
        </>
    )
}

export { InformacionPersonal }