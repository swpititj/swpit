import { NavLink } from "react-router-dom"

function BackButton() {
    return (
        <div className="d-flex justify-content-center">
            <NavLink to={-1}>
                <button className=" centrar btn btn-link" type="submit" value="submit">Regresar</button>
            </NavLink>
        </div>
    )
}

export { BackButton }