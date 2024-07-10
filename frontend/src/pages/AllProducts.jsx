import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import summaryApi from '../utils/backendDomain'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false)
    const [allProduct, setAllProduct] = useState([])
    const fetchAllProduct = async ()=> {
        const response = await fetch(summaryApi.AllProduct.url)
        const dataResponse = await response.json()
        console.log("data response ", dataResponse);
        setAllProduct(dataResponse?.data || [])
    }

    useEffect(()=> {
        fetchAllProduct()
    }, [])
    return (
        <div className='p-2'>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold  text-lg'>All Products</h2>
                <button className='border-2 border-black hover:bg-black hover:text-white py-1 px-3 rounded-full' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
            </div>

            {/*all products */}
            <div className='flex items-center flex-wrap gap-2 h-[calc(100vh-190px)] overflow-y-scroll py-4'>
                {
                    allProduct.map((product, index)=> {
                        return(
                            <AdminProductCard data={product} key={index + allProduct} fetchData={fetchAllProduct} />
                            
                        )
                    })
                }
            </div>

            {/* Upload product component */}
            {
                openUploadProduct && (
                    <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
                )
            }
            
        </div>
    )
}

export default AllProducts