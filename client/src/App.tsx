import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./components/navbar"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Chat from "./pages/Chat"

function App() {

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/sing-in" element={<SignIn />} />
        <Route path="/sing-up" element={<SignUp />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
