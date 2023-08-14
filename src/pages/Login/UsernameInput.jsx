import { useState } from "react"

function UsernameInput({username, setUsername}) {


    const onChange = (event)=>{
        setUsername(event.target.value)
    }

    return (
        <div className=" mt-4 ">
            <input className="form-control bg-light" type="text" placeholder="Usuario" id="username" value={username} require='true' onChange={onChange} />
        </div>
    )
}
export { UsernameInput }