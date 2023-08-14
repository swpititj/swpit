import {Children} from 'react'

function HeaderLogin({ children }) {
    return (
        <header className="header">
            <nav className="nav">
                <button className="nav-toggle" aria-label="Abrir menú" onClick={onClick}>
                    <i className="fas fa-bars" />
                </button>
                <ul className="nav-menu">
                    {children}
                </ul>
            </nav>
        </header>
    )
}

const onClick = () => {
    document.querySelector(".nav-menu").classList.toggle("nav-menu_visible");

    if (document.querySelector(".nav-menu").classList.contains("nav-menu_visible")) {
        document.querySelector(".nav-toggle").setAttribute("aria-label", "Cerrar menú");
    } else {
        document.querySelector(".nav-toggle").setAttribute("aria-label", "Abrir menú");
    }
}


export { HeaderLogin }
