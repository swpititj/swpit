function MenuOption({label, typeUser, setTypeUser}) {

    const onClick = (event)=>{
        event.preventDefault()
        setTypeUser(label)
    }

    return (
        <li className="nav-menu-item" onClick={onClick}>
            <a href="#" className={`nav-menu-link nav-link-c ${typeUser===label && "nav-menu-link_active"}`} >{label}</a>
        </li>
    )
}

export {MenuOption}