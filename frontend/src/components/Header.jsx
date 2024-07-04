import React, { useState } from 'react'
import Logo from './Logo'
import { CgSearch } from "react-icons/cg";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import summaryApi from '../utils/backendDomain';
import { toast } from 'react-toastify';
import { setUserDetails } from '../utils/store/userSlice';
import ROLE from '../utils/role';


const Header = () => {
    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch();
    const [menuDisplay, setMenuDisplay] = useState(false);

    const handleLogout = async () => {
        const fetchData = await fetch(summaryApi.logout_user.url, {
            method: summaryApi.logout_user.method,
            credentials: 'include'
        });
        const data = await fetchData.json()
        if (data.success) {
            toast.success(data.message);
            dispatch(setUserDetails(null))
        }
        if (data.error) {
            toast.error(data.message)
        }
    }
    return (
        <header className='h-20 shadow-md bg-white'>
            <div className='h-full container mx-auto flex items-center px-4 justify-between'>
                <div className=''>
                    {/* <Link to={"/"}><Logo w={90} h={50} /></Link> */}
                    <Link to={'/'}><img src='/justshoplogo.png' className='w-35 h-12' /></Link>
                </div>

                <div className='hidden lg:flex justify-between w-full items-center max-w-sm border rounded-full focus-within:shadow pl-3'>
                    <input type="text" placeholder='Search products here...' className='w-full h-7 outline-none' />
                    <div className='text-lg min-w-[50px] h-8 bg-black flex items-center justify-center rounded-r-full text-white'>
                        <CgSearch />
                    </div>
                </div>

                <div className='flex items-center justify-center gap-7'>
                    <div className='relative flex justify-center'>
                        {
                            user?._id && (
                                <div className='text-3xl cursor-pointer flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>
                                    {
                                        user?.profilePic ? (<img src={user?.profilePic} className='w-12 h-12 rounded-full' alt={user?.name} />) : (<FaRegCircleUser />)
                                    }
                                </div>
                            )
                        }
                        
                        {
                            menuDisplay && (
                                <div className='absolute bg-white bottom-0 top-7 h-fit p-2 shadow-lg rounded'>
                                    <nav>
                                        {
                                            user?.role === ROLE.ADMIN && (
                                                <Link to={'/admin-panel/all-products'} className='whitespace-nowrap hidden lg:block hover:bg-slate-200 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Admin Panel</Link>
                                            )
                                        }
                                    </nav>
                                </div>
                            )
                        }
                        
                    </div>

                    <div className='text-3xl cursor-pointer relative'>
                        <span><IoCartOutline /></span>
                        <div className='bg-black text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                            <p className='text-sm'>2</p>
                        </div>
                    </div>

                    <div>
                        {
                            user?._id ? (
                                <button onClick={handleLogout} className='px-3 py-1 text-black text-xl hover:text-white hover:bg-black outline rounded-full' >Logout</button>
                            ) : (
                                <Link to={"/login"} className='px-3 py-1 text-black text-xl hover:text-white hover:bg-black outline rounded-full'>Login</Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header