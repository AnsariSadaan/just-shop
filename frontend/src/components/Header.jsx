import React from 'react'
import Logo from './Logo'
import { CgSearch } from "react-icons/cg";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <header className='h-16 shadow-md bg-white'>
            <div className='h-full container mx-auto flex items-center px-4 justify-between'>
                <div className=''>
                    <Link to={"/"}><Logo w={90} h={50} /></Link>
                </div>

                <div className='hidden lg:flex justify-between w-full items-center max-w-sm border rounded-full focus-within:shadow pl-3'>
                    <input type="text" placeholder='Search products here...' className='w-full h-7 outline-none' />
                    <div className='text-lg min-w-[50px] h-8 bg-black flex items-center justify-center rounded-r-full text-white'>
                        <CgSearch />
                    </div>
                </div>

                <div className='flex items-center justify-center gap-7'>
                    <div className='text-3xl cursor-pointer'>
                        <FaRegCircleUser />
                    </div>

                    <div className='text-3xl cursor-pointer relative'>
                        <span><IoCartOutline /></span>
                        <div className='bg-black text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                            <p className='text-sm'>2</p>
                        </div>
                    </div>

                    <div>
                        <Link to={"/login"} className='px-3 py-1 text-black text-xl hover:text-white hover:bg-black outline rounded-full'>Login</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header