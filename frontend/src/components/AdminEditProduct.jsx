import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import summaryApi from '../utils/backendDomain';
import { toast } from 'react-toastify';

const AdminEditProduct = ({ onClose, productData, fetchData }) => {

    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage || [] ,
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice
    })
    const [openFullScreenImg, setOpenFullScreenImg] = useState(false)
    const [fullScreenImg, setFullScreenImg] = useState("");

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        const uploadImageCloudinary = await uploadImage(file)
        setData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.url]
            }
        })
    }


    const handleDeleteProdImg = async (index) => {
        console.log("Image index", index);
        const newProductImg = [...data.productImage]
        newProductImg.splice(index, 1)
        setData((prev) => {
            return {
                ...prev,
                productImage: [...newProductImg]
            }
        })
    }

    // upload product
    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataResopnse = await fetch(summaryApi.updateProduct.url, {
            method: summaryApi.updateProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const uploadData = await dataResopnse.json();
        if (uploadData.success) {
            toast.success(uploadData?.message);
            onClose();
            fetchData();
        }

        if (uploadData.error) {
            toast.error(uploadData?.message)
        }
    }

    return (
        <div className='fixed w-full h-full top-0 left-0 bottom-0 right-0 bg-slate-200 bg-opacity-30 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Edit Product</h2>
                    <div className='w-fit ml-auto text-2xl cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>
                <form className='grid p-4 gap-3 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <label htmlFor="productName">Product Name:</label>
                    <input
                        type="text"
                        name="productName"
                        id="productName"
                        placeholder='enter product name...'
                        value={data.productName}
                        onChange={handleOnChange}
                        className='bg-slate-100 p-2 border rounded'
                    />

                    <label htmlFor="brandName" className='mt-3'>Brand Name :</label>
                    <input
                        type="text"
                        name="brandName"
                        id="brandName"
                        placeholder='enter brand name...'
                        value={data.brandName}
                        onChange={handleOnChange}
                        className='bg-slate-100 p-2 border rounded'
                    />

                    <label htmlFor="category" className='mt-3'>Category :</label>
                    <select  value={data.category} name='category' onChange={handleOnChange} className='bg-slate-100 p-2 border rounded'>
                        <option value="">Select Category</option>
                        {
                            productCategory.map((elem, index) => {
                                return <option value={elem.value} key={elem.value + index}>{elem.label}</option>
                            })
                        }
                    </select>
                    <label htmlFor="productImage" className='mt-3'>Product Image :</label>
                    <label htmlFor="uploadImageInput">
                        <div className='p-2 h-32 w-full rounded bg-slate-100 border flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type="file" id="uploadImageInput"  className='hidden' onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>
                    <div>
                        {
                            data?.productImage[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        data.productImage.map((elem, index) => {
                                            return (
                                                <div className='relative group' key={index}>
                                                    <img
                                                        src={elem}
                                                        alt={elem}
                                                        width={80}
                                                        height={80}
                                                        className='bg-slate-100 border cursor-pointer'
                                                        onClick={() => {
                                                            setOpenFullScreenImg(true)
                                                            setFullScreenImg(elem)
                                                        }}
                                                    />
                                                    <div className='absolute bottom-0 right-0 p-1 text-white bg-black rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProdImg(index)}>
                                                        <MdDelete />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p className='text-xs'>*Please Upload Product</p>
                            )
                        }
                    </div>

                    <label htmlFor="price" className='mt-3'>Price :</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        placeholder='enter price...'
                        value={data.price}
                        onChange={handleOnChange}
                        className='bg-slate-100 p-2 border rounded'
                    />

                    <label htmlFor="sellingPrice" className='mt-3'>Selling Price :</label>
                    <input
                        type="number"
                        name="sellingPrice"
                        id="sellingPrice"
                        placeholder='enter selling price...'
                        value={data.sellingPrice}
                        onChange={handleOnChange}
                        className='bg-slate-100 p-2 border rounded'
                    />

                    <label htmlFor="description" className='mt-3'>Description :</label>
                    <textarea
                        className='bg-slate-100 p-2 border rounded resize-none h-28'
                        placeholder='enter description'
                        rows={3}
                        value={data.description}
                        onChange={handleOnChange}
                        name='description'
                        id='description'
                    ></textarea>
                    <button className='px-3 py-2 bg-slate-100 text-black hover:bg-black hover:text-white rounded mb-10'>Update Product</button>
                </form>
            </div>

            {/* Display image full screen */}
            {
                openFullScreenImg && (
                    <DisplayImage onClose={() => setOpenFullScreenImg(false)} imgUrl={fullScreenImg} />
                )
            }
        </div>
    )
}

export default AdminEditProduct