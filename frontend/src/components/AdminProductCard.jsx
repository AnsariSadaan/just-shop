import React, { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({ data, fetchData }) => {
    const [editProduct, setEditProduct] = useState(false)
    return (
        <div className='bg-white p-4 rounded'>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data?.productImage[0]} width={120} height={120} className='object-fill mx-auto h-full' />
                </div>
                <h1 className='text-ellipsis line-clamp-1'>{data?.productName}</h1>
                <div>
                    <p className='font-semibold'>
                        {displayINRCurrency(data?.sellingPrice)}
                    </p>
                    <div className='w-fit ml-auto bg-white text-black hover:bg-black hover:text-white rounded-full p-2 text-xl cursor-pointer' onClick={() => setEditProduct(true)}>
                        <MdModeEdit />
                    </div>
                </div>
            </div>
            {
                editProduct && (
                    <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchData={fetchData} />
                )
            }
        </div>
    )
}

export default AdminProductCard