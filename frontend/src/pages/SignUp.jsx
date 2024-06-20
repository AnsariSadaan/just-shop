import React, { useState } from 'react'
import loginIcon from '../assets/signin.gif'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';


const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePic: ""
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    const handleUploadPic = async (e) => {
        const file = e.target.files[0];
        const imagePic = await imageTobase64(file)
        console.log("imagePic", imagePic);
        setData((prev)=> {
            return {
                ...prev,
                profilePic: imagePic
            }
        })
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    console.log("data login", data)
    return (
        <section id='signup'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto rounded'>
                    <div className='mx-auto w-20 h-20 relative overflow-hidden rounded-full'>
                        <div>
                            <img src={data.profilePic || loginIcon} alt="login icon" />
                            <form>
                                <label>
                                    <div className='text-xs bg-opacity-80 bg-slate-200 pb-3 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>Upload pic</div>
                                    <input type="file" className='hidden' onChange={handleUploadPic}/>
                                </label>
                            </form>
                        </div>
                    </div>
                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Name :</label>
                            <div className='bg-slate-100 p-2   '>
                                <input
                                    type="text"
                                    placeholder='Enter your name'
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' required />
                            </div>
                        </div>
                        <div className='grid'>
                            <label>Email :</label>
                            <div className='bg-slate-100 p-2   '>
                                <input
                                    type="email"
                                    placeholder='Enter email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' required />
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
                                    className='w-full h-full outline-none bg-transparent' required />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)} >
                                    <span>
                                        {showPassword ? (<FaEyeSlash />) : (<FaEye />)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label>Confirm password :</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='Enter confirm password'
                                    value={data.confirmPassword}
                                    name='confirmPassword'
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' required />
                                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)} >
                                    <span>
                                        {showConfirmPassword ? (<FaEyeSlash />) : (<FaEye />)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button className='text-black text-xl hover:text-white hover:bg-black border outline px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-5'>Sign Up</button>
                    </form>
                    <p className='my-5'>Already have account ? <Link to={"/login"} className='text-red-500 hover:text-green-500 hover:underline'>Login</Link></p>
                </div>
            </div>
        </section>
    )
}

export default SignUp