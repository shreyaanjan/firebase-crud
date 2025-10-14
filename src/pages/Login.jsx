import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [input, setInput] = useState({ email: '', password: '', confirmPassword: '' })
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        signIn()
    }

    const signIn = async () => {
        setLoader(true)
        try {
            let user = await signInWithEmailAndPassword(auth, input.email, input.password)
            if (user) {
                toast.success("Logged In Successfully !");
                navigate("/")
            }
        } catch (error) {
            toast.error(
                error.code === "auth/invalid-email"
                    ? "Invalid Email !"
                    : error.code === "auth/user-not-found"
                    ? "User Not Found !"
                    : error.code === "auth/wrong-password"
                    ? "Wrong Password !"
                    : "Login Failed !"
            );
        } finally {
            setLoader(false)
        }
    }

    return (
        <div className="bg-[#D9F1FF] height flex items-center justify-center py-10">
            <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                <h2 className="text-[#010e37] uppercase text-2xl font-bold mb-6 text-center">
                    Welcome Back !
                </h2>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm uppercase font-semibold text-gray-700">
                        Your email
                    </label>
                    <input type="email" onChange={handleChange} value={input.email} id="email"
                        placeholder="name@example.com" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300" />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm uppercase font-semibold text-gray-700">
                        Your password
                    </label>
                    <input type="password" onChange={handleChange} value={input.password} id="password"
                        placeholder="*********" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300" />
                </div>
                <button type="submit" className="text-white uppercase bg-gradient-to-br from-blue-600 to-blue-800  hover:from-blue-700 hover:to-blue-900 focus:outline-none font-semibold rounded-lg text-sm px-6 py-2 w-full transform transition-all duration-300 ease-in-out">
                    {!loader ? "Login" : <span className="loader"></span>}
                </button>
                <p className="mt-4 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-blue-600 hover:underline cursor-pointer">
                        Sign Up
                    </span>
                </p>
            </form>
        </div>
    )
}

export default Login