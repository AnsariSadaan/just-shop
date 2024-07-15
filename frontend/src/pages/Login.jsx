import React, { useContext, useState } from 'react'
import loginIcon from '../assets/signin.gif'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../utils/backendDomain';
import { toast } from 'react-toastify';
import Context from '../context/userContext';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const { fetchUserDetails } = useContext(Context)
    // console.log("generalContext", generalContext.fetchUserDetails());
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataResponse = await fetch(summaryApi.signIn.url, {
                method: summaryApi.signIn.method,
                credentials: "include",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(data)
            });
            const dataApi = await dataResponse.json()

            if (dataApi.success) {
                toast.success(dataApi.message)
                navigate('/')
                fetchUserDetails();
            }

            if (dataApi.error) {
                toast.error(dataApi.message)
            }
        } catch (error) {
            toast.error("An unexpected error occurred")
        }
    }
    return (
        <section id='login'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto rounded'>
                    <div className='mx-auto w-20 h-20'>
                        <img src={loginIcon} alt="login icon" />
                    </div>
                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email :</label>
                            <div className='bg-slate-100 p-2   '>
                                <input
                                    type="email"
                                    placeholder='Enter email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>
                        <div>
                            <label>Password :</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter password'
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)} >
                                    <span>
                                        {showPassword ? (<FaEyeSlash />) : (<FaEye />)}
                                    </span>
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-700'>Forgot password ?</Link>
                        </div>
                        <button className='text-black text-xl hover:text-white hover:bg-black border outline px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-5'>Login</button>
                    </form>
                    <p className='my-5'>Don't have an account ? <Link to={"/signup"} className='text-red-500 hover:text-green-500 hover:underline'>Sign up</Link></p>
                </div>
            </div>
        </section>
    )
}

export default Login