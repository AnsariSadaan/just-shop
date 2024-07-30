import React, { useContext, useEffect, useRef, useState } from 'react'
import FetchCategoryWiseProduct from '../helpers/FetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context/userContext';

const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadingList = new Array(13).fill(null)
    const [scroll, setScroll] = useState(0)
    const scrollELement = useRef();
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }


    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await FetchCategoryWiseProduct(category)
        setLoading(false);
        setData(categoryProduct.data)
    }


    useEffect(() => {
        fetchData()
    }, [])

    const scrollRight = () => {
        scrollELement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollELement.current.scrollLeft -= 300
    }

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollELement}>
                <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><GrPrevious /></button>
                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><GrNext /></button>
                {

                    loading ? (
                        loadingList.map((product, index) => {
                            return (
                                <div key={product+index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                                    <div className='bg-slate-200 h-48 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                    </div>
                                    <div className='p-4 grid gap-3'>
                                        <h2 className='font-medium md:text-lg text-base text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                        <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                                        <div className='flex gap-3'>
                                            <p className='font-medium text-black p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                            <p className='line-through text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                        </div>
                                        <button className='text-sm text-white px-3 py-2 rounded-full animate-pulse bg-slate-200'></button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        data.map((product, index) => {
                            return (
                                <Link to={'/prodcut/'+ product?._id+index} key={product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                                    <div className='bg-slate-200 h-48 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center'>
                                        <img src={product?.productImage[0]} className='object-scale-down mix-blend-multiply h-full hover:scale-110' />
                                    </div>
                                    <div className='p-4 grid gap-2'>
                                        <h2 className='font-medium md:text-lg text-base text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.category}</p>
                                        <div className='flex justify-between items-center'>
                                            <p className='font-medium text-black'>{displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='line-through text-slate-500'>{displayINRCurrency(product?.price)}</p>
                                        </div>
                                        <button className='text-sm bg-black text-white hover:bg-slate-200 hover:text-black px-3 py-0.5 rounded-full' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                                    </div>
                                </Link>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}

export default VerticalCardProduct