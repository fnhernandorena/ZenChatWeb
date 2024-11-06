import { NavLink } from "react-router-dom";
export default function NavBar() {
  return (
    <nav className="w-full max-w-screen-md flex justify-around items-center font-bold p-2">
      <h1 className="text-3xl title p-2 rounded-lg">ZenChat Web</h1>
      <div className="gap-4 flex items-center   ">
        <NavLink className='duration-300' to="/sing-in">Sing in</NavLink>
        <NavLink className='duration-300' to="/sing-up">Sing up</NavLink>
      </div>
    </nav>
  );
}
