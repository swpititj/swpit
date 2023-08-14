import { Navbar } from "./../../components/Navbar/Navbar"
import { Header } from "./../../components/Header/Header"
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Container } from "./../../components/Container/Container";
import '/public/css/style_form.css'
import { Title } from "./Title";
import { Section } from "./Section";
import { Question } from "./Question";
import { Option } from "./Option";
import { onSubmit } from "./useSurvey";
import { SubmitSurvey } from "./SubmitSurvey";
import { BackButton } from "./BackButton";
import { Alert } from "react-bootstrap";


function Encuesta() {
    const [survey, setSurvey] = useState([])
    const [sections, setSections] = useState([])
    const [error, setError] = useState()

    const { URLAPI, user } = useAuth()
    const { idSurvey } = useParams()
    const navigate = useNavigate()

    const startDate = new Date().getTime()
    const csrf = user.csrf

    useEffect(() => {
        const fetchSurveys = async () => {
            const options = {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    Authorization: `Bearer ${user.token}`
                },
                credentials: "include"
            };
            const res = await fetch(URLAPI + "/encuestas/" + idSurvey, options);
            const json = await res.json();
            if(!res.ok){
                setError(json.memessagess)
            }else{
                setSections(json.Secciones)
                setSurvey(json);
            }
        }

        fetchSurveys()
    }, [])

    return (
        <>
            <Container>
                <Header />
                <div className="center">
                    {error && 
                        <div className="container">
                            <Alert key='danger' variant='danger'>
                                {error}
                            </Alert>
                        </div>
                    }
                    {survey === null ?
                        <p>...waiting</p>
                        :
                        <>
                            <Title name={survey.Nombre} />
                            <form onSubmit={async(e)=>{
                                setError()
                                const [res, err] = await onSubmit(e, startDate, user.token, idSurvey, URLAPI)
                                if(res) navigate(-1)
                                else setError(err.message)
                            }}>
                                {sections.map((section, i) => (
                                    <Section section={section} key={i}>
                                        {section.Preguntas.map((question, j) => (
                                            <Question question={question} key={j}>
                                                {question.TipoPregunta.DetTipoPreg.map((type, k) => (
                                                    <Option type={type} idQuestion={j} idSection={i} i={k} key={k} />
                                                ))}
                                            </Question>
                                        ))}
                                    </Section>
                                ))}
                                <SubmitSurvey/>
                                <br />
                                <BackButton/>
                                <br />
                            </form>
                        </>
                    }
                </div>
            </Container>
            <Navbar />
        </>
    )
}

export { Encuesta }