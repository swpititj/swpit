import '/public/css/style_form.css'

function Title({name}) {

    return (

        <div className="d-flex justify-content-center text-muted">
            <h1 className="text-center">{name}</h1>
        </div>

    )
}

export { Title }