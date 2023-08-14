function Option({ type, idQuestion, idSection, i }) {
    return (
        <>
            <div className="form-check">
                <label className="numbers">
                    <input 
                    className="opcion form-check-input" 
                    type="radio" 
                    name={idSection+"-"+idQuestion}
                    value={i} 
                    required/>
                    {type.Opcion}
                </label>
            </div>
        </>
    )
}

export { Option }