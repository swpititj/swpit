import { useEffect, useState } from "react"
import { HeaderLogin } from "./HeaderLogin"
import { Main } from "./Main"
import { MenuOption } from "./MenuOption"
import { PasswordInput } from "./PasswordInput"
import { SubmitButton } from "./SubmitButton"
import { UsernameInput } from "./UsernameInput"
import { useAuth } from "../../hooks/auth"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Alert, Spinner } from "react-bootstrap"

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [typeUser, setTypeUser] = useState('alumno')
    const [error, setError] = useState()
    
    const { user, login, check, isLoading, setUser, setIsLoading } = useAuth()
    const { userType } = useParams() 
    const { state } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const isCheck = async (to, token) => {

            setIsLoading(true)
            const [data, e] = await check(token)
            setIsLoading(false)

            if (data &&!e) {
                setUser(data)
                localStorage.setItem('token', data.token)
                navigate(to || '/home')
            }
            
            if(!data && e){
                setError(e.message)
            }
        }
        
        if(user) navigate(state?.to || '/home')
        
        const token = localStorage.getItem('token')
        if(token) isCheck(state?.to, token)

    }, [])

    return (
        <>
        {!isLoading &&
            <>
                <HeaderLogin>
                    <MenuOption typeUser={typeUser} setTypeUser={setTypeUser} label={"alumno"} />
                    <MenuOption typeUser={typeUser} setTypeUser={setTypeUser} label={"personal"} />
                    {/* <MenuOption typeUser={typeUser} setTypeUser={setTypeUser} label={"padres"} /> */}
                </HeaderLogin>
                <Main>
                    {/* Error */}
                    { error &&
                            <div className="container">
                                <Alert key='danger' variant='danger'>
                                    {error}
                                </Alert>
                            </div>
                        }
                    <form onSubmit={(event) => { event.preventDefault() }}>
                        <UsernameInput username={username} setUsername={setUsername} />
                        <PasswordInput password={password} setPassword={setPassword} />
                        {!isLoading && 
                            <SubmitButton onClick={ async() =>{
                                setIsLoading(true)
                                setError(false)
                                setUsername('')
                                setPassword('')
                                const [data, e] = await login(username, password, typeUser)
                                if(data && !e){
                                    setUser(data)
                                    localStorage.setItem('token', data.token)
                                    navigate(state?.to || '/home')
                                }else{
                                    setError(e.message)
                                }
                                setIsLoading(false)
                            }} />
                        }
                        {/* Loading */}
                        {isLoading &&
                            <div className="d-flex justify-content-center">
                                <Spinner animation="border" variant="primary" className="d-flex justify-content-center" />
                            </div>
                        }
                    </form>
                </Main>
            </>
        }
        </>
    )
}

export { Login }