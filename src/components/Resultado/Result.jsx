import { Navbar } from "../Navbar/Navbar"
import { Header } from "../Header/Header"
import '/public/css/style_form.css'
import { Container } from "../Container/Container";
import { NavLink, useParams } from "react-router-dom";
import { Title } from "../Encuesta/Title";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";

function Result({ details, result, judgment}) {
    return (
        <>
            <h2 className="text-center">Detalles</h2>
            <div className="cardBox">
                {
                    details.map((detail, i) => {
                        if (detail != null) {
                            return Object.entries(detail).map(([key, value], i) => (
                                <>
                                    <p className="fs-5" key={i}>
                                        <b>{key.replace(/([a-z])([A-Z])/g, "$1 $2")}: </b>
                                        {value}
                                    </p>
                                    <br />
                                </>
                            ))
                        }
                    })
                }
            </div>
            <h2 className="text-center">Dictamen</h2>
            <div className="cardBox">
                <p className="fs-5"><b>Evaluacion Descriptiva:</b> {judgment?.EvalDescripctiva}</p>
                <br />
                <p className="fs-5"><b>Evaluacion Numerica:</b> {judgment?.EvalNumerica}</p>
                <br />
                <p className="fs-5"><b>Observaciones:</b> {judgment?.Observaciones}</p>
                <br />
                <p className="fs-5"><b>Recomendaciones:</b> {judgment?.Recomendaciones}</p>
                <br />
                <p className="fs-5"><b>Fecha Aplicacion:</b> {result?.FechaAplicacion}</p>
                <br />
                <p className="fs-5"><b>Hora Inicio:</b> {result?.HoraInicio}</p>
                <br />
                <p className="fs-5"><b>Hora Final:</b> {result?.HoraFinal}</p>
                <br />
            </div>
            <div></div>
        </>
    )
}

export { Result }