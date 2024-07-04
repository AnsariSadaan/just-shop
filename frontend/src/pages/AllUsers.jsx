import React, { useEffect, useState } from 'react'
import summaryApi from '../utils/backendDomain'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({ email: "", name: "", role: "" , _id: ""})

    const fecthAllUsers = async () => {
        const fetchData = await fetch(summaryApi.allUser.url, {
            method: summaryApi.allUser.method,
            credentials: "include"
        })

        const dataResponse = await fetchData.json();
        if (dataResponse.success) {
            setAllUsers(dataResponse.data)
        }
        if (dataResponse.error) {
            toast.error(dataResponse.data)
        }
    }

    useEffect(() => {
        fecthAllUsers();
    }, [])

    return (
        <div className='bg-white pb-4'>
            <table className='w-full userTable'>
                <thead className='bg-black text-white'>
                    <tr>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUsers.map((elem, index) => {
                            return (
                                <>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{elem?.name}</td>
                                        <td>{elem?.email}</td>
                                        <td>{elem?.role}</td>
                                        <td>{moment(elem?.createdAt).format('LLLL')}</td>
                                        <td><button className='bg-green-100 cursor-pointer p-2 rounded-full hover:bg-green-600 hover:text-white' 
                                        onClick={() => {
                                            setUpdateUserDetails(elem)
                                            setOpenUpdateRole(true)
                                        }}
                                        
                                        ><MdModeEdit /></button></td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                openUpdateRole && (
                    <ChangeUserRole
                        onClose={() => setOpenUpdateRole(false)}
                        name={updateUserDetails.name}
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                        callFunc={fecthAllUsers}
                    />
                )
            }

        </div>
    )
}

export default AllUsers