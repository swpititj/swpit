function Section({ section, children }) {
    return (
        <>
            <div className="d-flex justify-content-start p-3 text-muted">
                <h2>{section.Titulo}</h2>
            </div>
            <div className="cardBox">
                {children}
            </div>
        </>
    )
}

export { Section }