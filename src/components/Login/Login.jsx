import { useEffect, useState } from "react"
import { HeaderLogin } from "./HeaderLogin"
import { Main } from "./Main"
import { MenuOption } from "./MenuOption"
import { PasswordInput } from "./PasswordInput"
import { SubmitButton } from "./SubmitButton"
import { UsernameInput } from "./UsernameInput"
import { useAuth } from "../../hooks/auth"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Spinner } from "react-bootstrap"

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [typeUser, setTypeUser] = useState('alumno')
    const [errorState, setErrorState] = useState()
    
    const { user, login, check, isLoading, setUser, setIsLoading } = useAuth()
    const { userType } = useParams() 
    const { state } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const isCheck = async (to, token) => {

            setIsLoading(true)
            const [data, error] = await check(token)
            setIsLoading(false)

            if (data &&!error) {
                setUser(data)
                localStorage.setItem('token', data.token)
                navigate(to || '/home')
            }
            
            if(!data && error){
                alert(error)
            }
        }
        
        if(user) navigate(state?.to || '/home')
        
        const token = localStorage.getItem('token')
        if(token) isCheck(state?.to, token)

    }, [])

    return (
        <>
            <HeaderLogin>
                <MenuOption typeUser={typeUser} setTypeUser={setTypeUser} label={"alumno"} />
                <MenuOption typeUser={typeUser} setTypeUser={setTypeUser} label={"personal"} />
                {/* <MenuOption typeUser={typeUser} setTypeUser={setTypeUser} label={"padres"} /> */}
            </HeaderLogin>
            <Main>
                <form onSubmit={(event) => { event.preventDefault() }}>
                    <UsernameInput username={username} setUsername={setUsername} />
                    <PasswordInput password={password} setPassword={setPassword} />
                    {!isLoading && 
                        <SubmitButton onClick={ async() =>{
                            setIsLoading(true)
                            setUsername('')
                            setPassword('')
                            const [data, error] = await login(username, password, typeUser)
                            if(data && !error){
                                setUser(data)
                                localStorage.setItem('token', data.token)
                                navigate(state?.to || '/home')
                            }else{
                                alert(error)
                            }
                            setIsLoading(false)
                        }} />
                    }
                    {isLoading &&
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" variant="primary" className="d-flex justify-content-center" />
                    </div>
                    }
                </form>
            </Main>
        </>
    )
}

export { Login }