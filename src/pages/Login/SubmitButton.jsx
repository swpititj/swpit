function SubmitButton({onClick}) {
    return (
        <button type="submit" className="btn text-white w-100 mt-4 fw-semibold shadow-sm bgcolor" onClick={onClick}>Iniciar Sesión</button>
    )
}
export { SubmitButton }