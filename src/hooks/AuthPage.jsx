import { useEffect } from "react"
import { useAuth } from "./auth"
import { Navigate, useLocation, useNavigate } from "react-router-dom"

function AuthPage({children, roles}){

    const { user } = useAuth()
    const {pathname} = useLocation()

    function checkRoles(role) {
        return role===user.userType
      }

    //if(user===null){ return <Navigate to='/' state={{to: pathname}}/>}
    if(user===null){ return <Navigate to='/' state={{to: '/home'}}/>}
    else {
        if(roles.find(checkRoles))
            return (children)
        else
            return <Navigate to='/' state={{to: '/home'}}/>
    }
}

export {AuthPage}