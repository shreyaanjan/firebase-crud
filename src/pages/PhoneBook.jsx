import { collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { db } from "../config/firebase"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

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
            displayContact()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mx-auto mt-5">
            <div className="flex items-center justify-between">
                <h2>Phonebook Details</h2>
                <button type="button" onClick={()=>navigate("/add-contact")}  className="text-white bg-[#ff5d22] hover:bg-[#e24d14] font-medium rounded-md text-sm px-7 py-2 flex items-center gap-2 transition">Add Contact</button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mail
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contact.map((user) => {
                                return <tr key={user.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.num}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.mail}
                                    </td>
                                    <td className="flex item-center gap-5 px-6 py-4">
                                        <Link to={`/edit-contact/${user.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                        <button onClick={() => handleDelete(user.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PhoneBook