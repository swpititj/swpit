function Container({children}) {
    return (
        <div className="container">
            <div className="main">
                {children}
            </div>
        </div>
    )
}

export {Container}