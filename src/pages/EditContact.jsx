import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { db } from "../config/firebase"

const EditContact = () => {
    const [input, setInput] = useState({ name: '', num: '', mail: '' })
    const navigate = useNavigate()

    const {id} = useParams()
    useEffect(()=>{
        const fetchData = async() => {
            const data = await getDoc(doc(db,"phonebook",id))
            setInput(data.data())
        }
        fetchData()
    }, [])

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await updateDoc(doc(db,"phonebook",id),input)
            setInput({ name: '', num: '', mail: '' })
        } catch (error) {
            console.log(error);
        }
        navigate("/")
    }

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-center">Edit Contact</h2>
            <form onSubmit={handleUpdate} className="max-w-sm mx-auto">
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
                    <input type="email" onChange={handleChange} value={input.mail} id="mail" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update Contact</button>
            </form>
        </div>
    )
}

export default EditContact