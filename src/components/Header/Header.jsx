import '/public/css/style_form.css'
import { IoIosMenu } from 'react-icons/io';

function Header() {
    return (
        <div className="topbar">
            <div className="toggle" onClick={()=>{
                document.querySelector(".navigation-1").classList.toggle("active");
                document.querySelector(".main").classList.toggle("active");
            }}>
                <IoIosMenu />
            </div>

            <div className="user">
                <img src="/imgs/login-icon.png" alt="" />
            </div>
        </div>
    )
}

export {Header}