import React, { useContext } from 'react'
import displayINRCurrency from '../helpers/displayCurrency'
import scrollTop from '../helpers/scrollTop'
import addToCart from '../helpers/addToCart'
import Context from '../context/userContext'
import { Link } from 'react-router-dom'


const VerticalProduct = ({ loading, data =[]}) => {
    const loadingList = new Array(13).fill(null)
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>

            {

                loading ? (
                    loadingList.map((product, index) => {
                        return (
                            <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
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
                    data?.map((product, index) => {
                        return (
                            <Link key={index} to={'/prodcut/' + product?._id} className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow' onClick={scrollTop}>
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
    )
}

export default VerticalProduct