import { useRef } from "react";
import './header.css'
import Logo from '../assets/logo.png'



function Header() {


    const headerRef = useRef<HTMLDivElement>(null);


    return (
        <div ref={headerRef} className={"header"} id="myHeader">
            <div className="header-left" onClick={() => {
                window.location.href = "/"
            }}>
                <img src={Logo} alt="" className="Logo" />
                <h2 className="header-title">Statistics</h2>
            </div>


        </div>
    )
}

export default Header