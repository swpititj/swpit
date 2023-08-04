function Main({ children }) {
    return (
        <main className=" d-flex justify-content-center align-items-center vh-100">
            <div className="bg-white p-5 rounded-5 text-secondary shadow" style={{width: '30rem'}}>
                <div className="d-flex justify-content-center">
                    <img src="/assets/login-icon.png" alt="login-icon" style={{height: '7rem'}}/>
                </div>
                <div className="text-center fs-1 fw-bold">Inicio de Sesión</div>
                {children}
            </div>
        </main>

    )
}

export { Main }