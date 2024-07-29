import React, { useContext, useEffect, useState } from 'react'
import summaryApi from '../utils/backendDomain';
import Context from '../context/userContext';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const context = useContext(Context);
    const loadingCart = new Array(context?.cartProductCount).fill(null);

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(summaryApi.addToCartProductView.url, {
            method: summaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
        })
        setLoading(false)
        const responseData = await response.json()
        if (responseData.success) {
            setData(responseData.data)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const increaseQty = async (id, qty) => {
        const response = await fetch(summaryApi.updateCartProduct.url, {
            method: summaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1
            })
        })
        const responseData = await response.json()
        if (responseData.success) {
            fetchData()
        }
    }

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(summaryApi.updateCartProduct.url, {
                method: summaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1
                })
            })
            const responseData = await response.json()
            if (responseData.success) {
                fetchData()
            }
        }
    }

    const deleteCartProduct = async (id) => {
        const response = await fetch(summaryApi.deleteCartProduct.url, {
            method: summaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({
                _id: id,
            })
        })
        const responseData = await response.json()
        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const totalQuantity = data.reduce((prev, curr) => prev + curr?.quantity, 0)
    const totalPrice = data.reduce((prev, curr) => prev + (curr?.quantity * curr?.productId?.sellingPrice), 0)

    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>No Cart item</p>
                    )
                }
            </div>
            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                {/* view product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart.map((el, index) => {
                                return <div key={el + "add to cart product" + index} className='w-full bg-slate-200 h-32 my-1 border border-slate-300 animate-pulse'>

                                </div>
                            })

                        ) : (
                            data.map((product, index) => {
                                return (
                                    <div key={product?._id + "add to cart product"} className='w-full bg-white h-32 my-2 border border-slate-300 grid grid-cols-[128px_1fr]'>
                                        <div className='w-32 h-32 bg-slate-200'>
                                            <img src={product?.productId?.productImage[0]} className="w-full h-full object-scale-down mix-blend-multiply" />
                                        </div>
                                        <div className='px-4 py-2 relative'>
                                            {/* delete cart product */}
                                            <div
                                                className='absolute right-0 text-black rounded-full p-2 hover:bg-black hover:text-white cursor-pointer'
                                                onClick={() => deleteCartProduct(product?._id)}
                                            >
                                                <MdDelete />
                                            </div>
                                            <h2 className='text-lg lg:text-2xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                            <div className='flex items-center justify-between'>
                                                <p className='font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                                <p className='font-semibold text-lg text-slate-600'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                            </div>
                                            <div className='flex items-center gap-3 mt-1'>
                                                <button className='border text-lg border-black hover:bg-black hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>
                                                <span>{product?.quantity}</span>
                                                <button className='border text-lg border-black hover:bg-black hover:text-white w-6 h-6 flex  justify-center items-center rounded' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>

                {/* summary product */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                Total
                            </div>
                        ) : (
                            <div className='h-36 bg-white'>
                                <h2 className='bg-black text-white py-2 px-4'>Summary</h2>
                                <div className='flex items-center justify-between px-4 gap-2 text-lg'>
                                    <p>Quantity</p>
                                    <p>{totalQuantity}</p>
                                </div>
                                <div className='flex items-center justify-between px-4 gap-2 text-lg'>
                                    <p>Total Price :</p>
                                    <p>{displayINRCurrency(totalPrice)}</p>
                                </div>
                                <button className='bg-black px-2 py-2 text-white w-full '>Payment</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart