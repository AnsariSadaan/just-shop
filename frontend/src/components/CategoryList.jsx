import React, { useEffect, useState } from 'react'
import summaryApi from '../utils/backendDomain'
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false);
    const categoryLoading = new Array(13).fill(null);

    const fetchCategoryProduct = async () => {
        setLoading(true)
        const response = await fetch(summaryApi.categoryProduct.url)
        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)
    }

    useEffect(() => {
        fetchCategoryProduct()
    }, [])

    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center justify-between gap-4 overflow-scroll scrollbar-none'>
                {
                    loading ? (
                        categoryLoading.map((elem, index) => {
                            return (
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}></div>
                            )
                        })
                    ) : (
                        categoryProduct.map((product, index) => {
                            return (
                                <Link to={"/product-category?category=" + product?.category} className='cursor-pointer' key={product?.category}>
                                    <div className='w-16 h-16 md:w-20 md:h-20 flex justify-center items-center rounded-full overflow-hidden p-4 bg-slate-200'>
                                        <img className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'
                                            src={product?.productImage[0]}
                                            alt={product?.category} />
                                    </div>
                                    <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                                </Link>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}

export default CategoryList