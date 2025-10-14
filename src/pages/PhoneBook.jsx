import { collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { db } from "../config/firebase"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const PhoneBook = () => {
    const [contact, setContact] = useState([])

    useEffect(() => {
        displayContact()
    }, [contact])

    const navigate = useNavigate()

    const displayContact = async () => {
        const phoneSnapshot = await getDocs(collection(db, "phonebook"))
        try {
            let phoneData = phoneSnapshot.docs.map((contact) => {
                return {
                    id: contact.id,
                    ...contact.data()
                }
            })
            setContact(phoneData)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "phonebook", id))
            toast.success("Contact Deleted Successfully !");
            displayContact()
        } catch (error) {
            console.log(error);
            toast.error("Failed to Delete Contact. Please Try Again !");
        }
    }

    return (
        <div className="bg-[#D9F1FF] pt-5 px-4 sm:px-6 min-h-screen">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <h2 className="font-bold uppercase text-xl">Phonebook Details</h2>
                    <button type="button" onClick={() => navigate("/add-contact")}
                        className="text-white bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold uppercase rounded-lg text-sm sm:text-base px-4 sm:px-6 py-1.5 sm:py-2 w-auto sm:w-auto transform transition-all duration-300 ease-in-out">
                        Add Contact
                    </button>
                </div>
                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-300 uppercase bg-[#010e37]">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Number</th>
                            <th scope="col" className="px-6 py-3">Mail</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contact.map((user) => (
                            <tr key={user.id} className="bg-white text-gray-900 !border-b !border-gray-300">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {user.name}
                                </th>
                                <td className="px-6 py-4">{user.num}</td>
                                <td className="px-6 py-4">{user.mail}</td>
                                <td className="flex items-center gap-5 px-6 py-4">
                                    <Link to={`/edit-contact/${user.id}`} className="text-lg text-green-600 dark:text-green-500 hover:underline">
                                        <i className="bi bi-pencil-square"></i>
                                    </Link>
                                    <button onClick={() => handleDelete(user.id)} className="text-lg text-red-600 dark:text-red-500 hover:underline">
                                        <i className="bi bi-trash3"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PhoneBook