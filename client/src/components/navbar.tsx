import { NavLink } from "react-router-dom"
export default function NavBar(){
    return(
        <nav>
            <NavLink to="/sing-in">Sing in</NavLink>
            <NavLink to="/sing-up">Sing up</NavLink>
        </nav>
    )
}