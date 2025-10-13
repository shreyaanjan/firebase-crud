import { signOut } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"

const Header = ({ isLoggedIn }) => {
    const navigate = useNavigate()

    return (
        <div className="bg-[#D9F1FF]">
            <nav className="container mx-auto">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/"
                        className="flex items-center gap-2 text-3xl font-extrabold tracking-wide uppercase  bg-gradient-to-r from-[#010e37] via-[#09247e] to-[#010e37]  text-transparent bg-clip-text select-none">
                        <i className="bi bi-telephone-fill"></i>
                        EasyDial
                    </Link>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 font-medium">
                            <li>
                                <Link to={"/"} className="block font-bold text-[#010e37]">Phonebook</Link>
                            </li>
                        </ul>
                        <div className="ms-5">
                            {
                                isLoggedIn ? <button
                                    type="button"
                                    onClick={async () => {
                                        await signOut(auth);
                                    }}
                                    className="text-gray-200 bg-gradient-to-br from-[#010e37] to-[#09247e] hover:from-[#09247e] hover:to-[#010e37] font-semibold rounded-lg uppercase text-sm px-7 py-2 text-center transition-color duration-300 ease-in-out hover:shadow-lg">
                                    Logout
                                </button>
                                    :
                                    <button type="button" onClick={() => navigate("/login")} className="text-gray-200 bg-gradient-to-br from-[#010e37] to-[#09247e] hover:from-[#09247e] hover:to-[#010e37] font-semibold rounded-lg uppercase text-sm px-7 py-2 text-center transition-color duration-300 ease-in-out hover:shadow-lg">Login</button>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header