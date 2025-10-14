import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import Header from "./components/Header"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import AddContact from "./pages/AddContact"
import PhoneBook from "./pages/PhoneBook"
import EditContact from "./pages/EditContact"
import ProtectedRoutes from "./components/ProtectedRoutes"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "./config/firebase"
import { ToastContainer } from "react-toastify"

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true)
                setLoader(false)
            } else {
                setIsLoggedIn(false)
                setLoader(true)
            }
        })
        return () => unsubscribe()
    }, [])

    
    return (
        <BrowserRouter>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route path="/" element={<ProtectedRoutes Component={PhoneBook} isLoggedIn={isLoggedIn} />} />
                <Route path="/login" element={<Login />}  />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/add-contact" element={<ProtectedRoutes Component={AddContact}  isLoggedIn={isLoggedIn} />} />
                <Route path="/edit-contact/:id" element={<ProtectedRoutes Component={EditContact}  isLoggedIn={isLoggedIn} />} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    )
}

export default App