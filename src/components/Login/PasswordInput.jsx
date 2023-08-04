import { useState } from "react"

function PasswordInput({password, setPassword}) {

    const onChange = (event)=>{
        setPassword(event.target.value)
    }

    return (
        <div className=" mt-1">
            <input className="form-control bg-light" type="password" placeholder="Contraseña" id="password" value={password} require='true' onChange={onChange} />
        </div>
    )
}
export { PasswordInput }