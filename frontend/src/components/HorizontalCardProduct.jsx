import React, { useEffect, useRef, useState } from 'react'
import FetchCategoryWiseProduct from '../helpers/FetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadingList = new Array(13).fill(null)
    const [scroll, setScroll] = useState(0)
    const scrollELement = useRef();

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

            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollELement}>
                <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><GrPrevious /></button>
                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><GrNext /></button>
                {
                    loading ? (
                        loadingList.map((product, index) => {
                            return (
                                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]: h-36 bg-white rounded-sm shadow flex'>
                                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                                    </div>
                                    <div className='p-4 grid w-full gap-2'>
                                        <h2 className='font-medium md:text-lg text-base text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                                        <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                        <div className='flex gap-3 w-full'>
                                            <p className='font-medium text-black p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                            <p className='line-through text-slate-500 p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                        </div>
                                        <button className='text-sm text-white px-3 py-0.5 w-full bg-slate-200 animate-pulse rounded-full'></button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        data.map((product, index) => {
                            return (
                                <Link to={'prodcut/'+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]: h-36 bg-white rounded-sm shadow flex'>
                                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                        <img src={product?.productImage[0]} className='object-scale-down h-full hover:scale-110' />
                                    </div>
                                    <div className='p-4 grid'>
                                        <h2 className='font-medium md:text-lg text-base text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.category}</p>
                                        <div className='flex justify-between items-center'>
                                            <p className='font-medium text-black'>{displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='line-through text-slate-500'>{displayINRCurrency(product?.price)}</p>
                                        </div>
                                        <button className='text-sm bg-black text-white hover:bg-slate-200 hover:text-black px-3 py-0.5 rounded-full' onClick={(e)=>addToCart(e, product?._id)}>Add to Cart</button>
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

export default HorizontalCardProduct