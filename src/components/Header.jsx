import { signOut } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"
import { useState } from "react"

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const [menu, setMenu] = useState(false)
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await signOut(auth)
            setIsLoggedIn(false)
            navigate("/login")
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className="bg-[#D9F1FF] relative">
            <nav className="container mx-auto">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-3xl font-extrabold tracking-wide uppercase bg-gradient-to-r from-[#010e37] via-[#09247e] to-[#010e37] text-transparent bg-clip-text select-none"
                    >
                        <i className="bi bi-telephone-fill"></i>
                        EasyDial
                    </Link>
                    <div className="flex items-center gap-5 md:hidden">
                        <button
                            onClick={() => setMenu(!menu)}
                            className="text-[#010e37] text-2xl"
                        >
                            {menu ? "✕" : "☰"}
                        </button>
                    </div>
                    <div className="items-center justify-between hidden md:flex md:w-auto md:order-1">
                        <ul className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0 font-medium">
                            <li>
                                <Link
                                    to={"/"}
                                    onClick={() => setMenu(false)}
                                    className="block font-bold text-[#010e37]"
                                >
                                    Phonebook
                                </Link>
                            </li>
                        </ul>
                        <div className="ms-5">
                            {isLoggedIn ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleLogout()
                                        setMenu(false)
                                    }}
                                    className="text-gray-200 bg-gradient-to-br from-[#010e37] to-[#09247e] hover:from-[#09247e] hover:to-[#010e37] font-semibold rounded-lg uppercase text-sm px-7 py-2 text-center transition-all duration-300 ease-in-out hover:shadow-lg"
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        navigate("/login")
                                        setMenu(false)
                                    }}
                                    className="text-gray-200 bg-gradient-to-br from-[#010e37] to-[#09247e] hover:from-[#09247e] hover:to-[#010e37] font-semibold rounded-lg uppercase text-sm px-7 py-2 text-center transition-all duration-300 ease-in-out hover:shadow-lg"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            {menu && (
                <div className="fixed inset-0 bg-[#D9F1FF] z-50 flex flex-col p-6 md:hidden animate-fadeIn">
                    <div className="flex justify-between items-center mb-10">
                        <Link
                            to="/"
                            onClick={() => setMenu(false)}
                            className="flex items-center gap-2 text-3xl font-extrabold tracking-wide uppercase bg-gradient-to-r from-[#010e37] via-[#09247e] to-[#010e37] text-transparent bg-clip-text select-none"
                        >
                            <i className="bi bi-telephone-fill"></i>
                            EasyDial
                        </Link>
                        <button
                            onClick={() => setMenu(false)}
                            className="text-[#010e37] text-3xl"
                        >
                            ✕
                        </button>
                    </div>
                    <ul className="flex flex-col space-y-6 font-medium text-left">
                        <li>
                            <Link
                                to={"/"}
                                onClick={() => setMenu(false)}
                                className="block font-bold text-[#010e37] text-lg"
                            >
                                Phonebook
                            </Link>
                        </li>
                    </ul>
                    <div className="mt-8">
                        {isLoggedIn ? (
                            <button
                                type="button"
                                onClick={() => {
                                    handleLogout()
                                    setMenu(false)
                                }}
                                className="text-gray-200 bg-gradient-to-br from-[#010e37] to-[#09247e] hover:from-[#09247e] hover:to-[#010e37] font-semibold rounded-lg uppercase text-sm px-7 py-2 text-center transition-all duration-300 ease-in-out hover:shadow-lg"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => {
                                    navigate("/login")
                                    setMenu(false)
                                }}
                                className="text-gray-200 bg-gradient-to-br from-[#010e37] to-[#09247e] hover:from-[#09247e] hover:to-[#010e37] font-semibold rounded-lg uppercase text-sm px-7 py-2 text-center transition-all duration-300 ease-in-out hover:shadow-lg"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Header