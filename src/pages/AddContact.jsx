import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import { db } from "../config/firebase"
import { useNavigate } from "react-router-dom"

const AddContact = () => {
    const [input, setInput] = useState({ name:'', num:'', mail:''})
    const navigate = useNavigate()

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }
    console.log(input);

    const handleSubmit = (e) => {
        e.preventDefault()
        addBook()
        setInput({ name: '', num: '', mail: '' })
        navigate("/")
    }

    const addBook = async () => {
        let res = await addDoc(collection(db, "phonebook"),input)
        console.log(res);
    }

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-center">Add Contact</h2>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name :</label>
                    <input type="text" onChange={handleChange} value={input.name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="num" className="block mb-2 text-sm font-medium text-gray-900    ">Contact Number : </label>
                    <input type="number" onChange={handleChange} value={input.num} id="num" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="mail" className="block mb-2 text-sm font-medium text-gray-900    ">Email Id : </label>
                    <input type="email"  onChange={handleChange} value={input.mail}  id="mail" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add Contact</button>
            </form>
        </div>
    )
}

export default AddContact