import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { db } from "../config/firebase"
import { toast } from "react-toastify"

const EditContact = () => {
    const [input, setInput] = useState({ name: '', num: '', mail: '' })
    const navigate = useNavigate()

    const { id } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            const data = await getDoc(doc(db, "phonebook", id))
            setInput(data.data())
        }
        fetchData()
    }, [])

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        if (input.name.trim() == "" || input.num.trim() == "" || input.mail.trim() == "") {
            toast.error("Enter All Details Correctly !")
            return;
        }

        if (input.num.trim().length !== 10) {
            toast.error("Contact number must be exactly 10 digits !");
            return;
        }

        try {
            await updateDoc(doc(db, "phonebook", id), input)
            setInput({ name: '', num: '', mail: '' })
            toast.success("Contact Edit Successfully !");
        } catch (error) {
            console.error("Error adding contact:", error);
            toast.error("Failed to Add Contact. Please Try Again !");
        }
        navigate("/")
    }

    return (
        <div className="bg-[#D9F1FF] height flex items-center justify-center py-10">
            <form onSubmit={handleUpdate}
                className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                <h2 className="text-[#010e37] text-2xl uppercase font-bold mb-6 text-center">
                    Edit Contact
                </h2>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-700">
                        Name
                    </label>
                    <input type="text" onChange={handleChange} value={input.name} id="name" placeholder="Enter name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="num" className="block mb-2 text-sm font-semibold text-gray-700">
                        Contact Number
                    </label>
                    <input type="number" onChange={handleChange} value={input.num} id="num"
                        placeholder="Enter number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="mail" className="block mb-2 text-sm font-semibold text-gray-700">
                        Email Id
                    </label>
                    <input type="email" onChange={handleChange} value={input.mail} id="mail"
                        placeholder="Enter email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300" required />
                </div>
                <button type="submit" className="text-white bg-gradient-to-br from-blue-600 to-blue-800  hover:from-blue-700 hover:to-blue-900 focus:outline-none font-medium rounded-lg text-sm px-6 py-2 w-full transform transition-all duration-300 ease-in-ou">
                    Edit Contact
                </button>
            </form>
        </div>
    )
}

export default EditContact