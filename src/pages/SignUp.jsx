import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "../config/firebase"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const SignUp = () => {
    const [input, setInput] = useState({ email: '', password: '', confirmPassword: '' })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createUser()
    }

    const createUser = async () => {
        try {
            let res = await createUserWithEmailAndPassword(auth, input.email, input.password)
            if (res) {
                toast.success("Account Created Successfully !");
                navigate("/")
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error.code === "auth/email-already-in-use"
                    ? "Email Already in Use !"
                    : error.code === "auth/invalid-email"
                    ? "Invalid Email !"
                    : error.code === "auth/weak-password"
                    ? "Password should be at least 6 characters !"
                    : "Signup Failed !"
            );
        }

    }

    return (
        <div className="bg-[#D9F1FF] height flex items-center justify-center py-10">
            <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                <h2 className="text-[#010e37] text-2xl uppercase font-bold my-5 text-center">
                    Create&nbsp; Account
                </h2>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm uppercase font-semibold text-gray-700">
                        Email
                    </label>
                    <input type="email" onChange={handleChange} value={input.email} id="email"
                        placeholder="name@example.com" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300" />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm uppercase font-semibold text-gray-700">
                        Password
                    </label>
                    <input type="password" onChange={handleChange} value={input.password} id="password"
                        placeholder="Enter your password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300" />
                </div>
                <div className="mb-5">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm uppercase font-semibold text-gray-700">
                        Repeat&nbsp; Password
                    </label>
                    <input type="password" onChange={handleChange} value={input.confirmPassword}
                        id="confirmPassword" placeholder="Repeat your password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300" />
                </div>
                <button type="submit" className="text-white uppercase bg-gradient-to-br from-blue-600 to-blue-800  hover:from-blue-700 hover:to-blue-900 focus:outline-none font-semibold rounded-lg text-sm px-6 py-2 w-full transform transition-all duration-300 ease-in-ou">
                    Sign Up
                </button>
                <p className="mt-4 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")} className="text-blue-600 hover:underline cursor-pointer">
                        Login
                    </span>
                </p>
            </form>
        </div>
    )
}

export default SignUp