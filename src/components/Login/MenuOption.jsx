function MenuOption({label, typeUser, setTypeUser}) {

    const onClick = (event)=>{
        event.preventDefault()
        document.querySelector(".nav-menu").classList.toggle("nav-menu_visible");
        document.querySelector(".nav-toggle").setAttribute("aria-label", "Cerrar menú");
        setTypeUser(label)
    }

    return (
        <li className="nav-menu-item" onClick={onClick}>
            <a href="#" className={`nav-menu-link nav-link-c ${typeUser===label && "nav-menu-link_active"}`} >{label}</a>
        </li>
    )
}

export {MenuOption}