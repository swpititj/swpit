import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '../../hooks/auth';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);



function ModalReports({ show, setShow, dataSurvey, studentsLength}) {

    const [labels, setLabels] = useState(null)
    const [data, setData] = useState(null)

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

            const res = await fetch(URLAPI + "/grupos/"+dataSurvey.idGroup+"/reporte/"+dataSurvey.idEncuesta, options)
            const json = await res.json();
            setLabels(Object.keys(json))
            setData(Object.values(json))

        }
        if (dataSurvey) {
            fetchSurveys()
            console.log(studentsLength)
        }
    }, [dataSurvey])


    const handleClose = () => {
        setData(null)
        setLabels(null)
        setError(null)
        setShow(false)
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{dataSurvey?.Nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <>
                            {labels === null?
                                <p>...waiting</p>
                                :
                                <>
                                    <p><b>Cantidad Estudiantes:</b> {studentsLength}</p>
                                    <p><b>Encuestas Realizadas:</b> {data.reduce((p,c)=>p+c)}</p>
                                    {
                                        labels.map((label,i)=>(
                                            <p><b>{label}:</b> {data[i]}</p>
                                        ))
                                    }
                                    <Pie data={
                                        {
                                        labels,
                                        datasets: [{
                                            label: '#',
                                            data,
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.2)',
                                                'rgba(54, 162, 235, 0.2)',
                                                'rgba(255, 206, 86, 0.2)',
                                                'rgba(75, 192, 192, 0.2)',
                                                'rgba(153, 102, 255, 0.2)',
                                                'rgba(255, 159, 64, 0.2)',
                                            ],
                                            borderColor: [
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                'rgba(75, 192, 192, 1)',
                                                'rgba(153, 102, 255, 1)',
                                                'rgba(255, 159, 64, 1)',
                                            ],
                                            borderWidth: 1
                                        }
                                    ]}} />
                                </>
                            }
                        </>
                    
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

export { ModalReports };