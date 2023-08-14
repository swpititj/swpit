import { Navbar } from "../../components/Navbar/Navbar"
import { Header } from "../../components/Header/Header"
import '/public/css/style_form.css'
import { Container } from "../../components/Container/Container";
import { NavLink, useParams } from "react-router-dom";
import { Title } from "../../pages/Encuesta/Title";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { Result } from "./Result";

function Resultado() {
    const [result, setResult] = useState(null)
    const [judgment, setJudgment] = useState({})
    const [details, setDetails] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const { nameSurvey, idSurvey } = useParams()
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
                const res = await fetch(URLAPI + "/resultados/" + idSurvey, options)
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

        fetchSurveys()
    }, [])

    return (
        <>
            <Container>
                <Header />
                <div className="center">
                    <Title name={nameSurvey} />
                    {!error ?
                        <>
                            {result===null ?
                                <p>...waiting</p>
                                :
                                <Result details={details} result={result} judgment={judgment}/>
                            }
                        </>
                        :
                        <p className="text-center text-danger">Aun no has realizado la encuesta</p>
                    }
                    <div className="d-flex justify-content-center">
                        <NavLink to={"/encuesta/" + idSurvey}>
                            <button className=" centrar btn btn-outline-primary" type="submit" value="submit">Realizar Encuesta</button>
                        </NavLink>
                    </div>
                    <br />
                    <div className="d-flex justify-content-center">
                        <NavLink to={-1}>
                            <button className=" centrar btn btn-link" type="submit" value="submit">Regresar</button>
                        </NavLink>
                    </div>
                </div>
            </Container>
            <Navbar />
        </>
    )
}

export { Resultado }