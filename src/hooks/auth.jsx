import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const URLAPI = 'https://swpit-api-f7az4aatqq-uc.a.run.app'
    //const URLAPI = 'http://127.0.0.1:5050'
    //const URLAPI = 'http://192.168.1.18:5050'

    const login = async (username, password, typeUser = 'student') => {

        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("typeuser", typeUser); //typeUser

        const options = {
            method: "POST",
            body: formData,
        };

        // [data, error]
        const response = await fetch(URLAPI + "/auth/login", options).catch((error) => [null, error])
        if (!response.ok)
            return [null, 'Usuario o Contraseña Incorrecta']

        const data = await response.json()
        return [data, null]


    }

    const check = async (token) => {

        const option = { 
            method: 'GET',
            headers: {}
        }

        debugger;
        if(token) option.headers.Authorization = `Bearer ${token}`

        const response = await fetch(URLAPI + '/auth/check', option).catch(error => [null, error])
        if (!response.ok)
            return [null, null]
        const data = await response.json();
        return [data, null]

    }

    const logout = async () => {
        const response = await fetch(URLAPI + '/auth/logout', { method: 'POST' }).catch(error => [false, error])
        if (!response.ok) return [false, 'error']
        return [true, null]
    }

    const auth = { user, login, logout, check, isLoading, URLAPI, setUser, setIsLoading }

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, useAuth }