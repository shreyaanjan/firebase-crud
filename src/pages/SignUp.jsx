import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "../config/firebase"
import { useNavigate } from "react-router-dom"

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
            if(res) navigate("/")
            // console.log(res);
        } catch (error) {
            alert(error);
        }

    }
    
    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                    <input type="email" onChange={handleChange} value={input.email} id="email" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                    <input type="password" onChange={handleChange} value={input.password} id="password" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Repeat password</label>
                    <input type="password" onChange={handleChange} value={input.confirmPassword} id="confirmPassword" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className="flex item-center gap-5">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp