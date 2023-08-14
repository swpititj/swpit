function Question({ question, children }) {
    return (
        <>
            <div className="card">
                <p className="cardName">{question.TituloPregunta}</p>
                <br />
                <fieldset>
                    {children}
              </fieldset>
            </div>
        </>
    )
}

export { Question }