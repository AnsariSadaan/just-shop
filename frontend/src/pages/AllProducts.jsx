import React, { useState } from 'react'
import UploadProduct from '../components/UploadProduct'

const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false)
    return (
        <div className='p-2'>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold  text-lg'>All Products</h2>
                <button className='border-2 border-black hover:bg-black hover:text-white py-1 px-3 rounded-full' onClick={()=>setOpenUploadProduct(true)}>Update Product</button>
            </div>

            {/* Upload product component */}
            {
                openUploadProduct && (
                    <UploadProduct onClose={()=>setOpenUploadProduct(false)} />
                )
            }
            
        </div>
    )
}

export default AllProducts