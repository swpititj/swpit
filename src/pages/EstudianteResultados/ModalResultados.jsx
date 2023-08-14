import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '../../hooks/auth';
import { Result } from '../../pages/Resultado/Result';

function ModalResultados({ show, setShow, dataSurvey }) {

    const [result, setResult] = useState(null)
    const [judgment, setJudgment] = useState({})
    const [details, setDetails] = useState([])

    const [error, setError] = useState()

    const { URLAPI, user } = useAuth()

    useEffect(() => {
        const fetchSurveys = async () => {
            const options = {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    Authorization: `Bearer ${user.token}`
                },
            };

            try {
                const res = await fetch(URLAPI + "/resultados/" + dataSurvey.idEncuesta + "?estudiante=" + dataSurvey.idStudent, options)
                const json = await res.json();
                setResult(json)
                setJudgment(json.Dictamen[0])
                let {
                    DetalleAsertividad,
                    DetalleAutoEstima,
                    DetalleDicHA,
                    DetalleDicHE,
                    DetalleDictInvApre,
                } = json.Dictamen[0];

                setDetails([
                    DetalleAsertividad[0] || null,
                    DetalleAutoEstima[0] || null,
                    DetalleDicHA[0] || null,
                    DetalleDicHE[0] || null,
                    DetalleDictInvApre[0] || null,
                ]);
                
            } catch (error) {
                setError(true)
            }
        }
        if (dataSurvey) {
            fetchSurveys()
        }
    }, [dataSurvey])


    const handleClose = () => {
        setResult(null)
        setJudgment({})
        setDetails([])
        setShow(false)
        setError(null)
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{dataSurvey?.Nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {!error ?
                        <>
                            {result === null?
                                <p>...waiting</p>
                                :
                                <Result details={details} result={result} judgment={judgment}/>
                            }
                        </>
                        :
                        <p className="text-center text-danger">Aun no ha realizado la encuesta</p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export { ModalResultados };