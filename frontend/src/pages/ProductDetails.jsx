import React, { useCallback, useEffect, useState } from 'react'
import summaryApi from '../utils/backendDomain'
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';

const ProductDetails = () => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: "",
    })
    const [loading, setLoading] = useState(false)
    const [activeImage, setActiveImage] = useState("")
    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
        x: 0,
        y: 0
    })
    const [zoomImage, setZoomImage] = useState(false)
    const productImageListLoading = new Array(4).fill(null);
    const params = useParams()

    console.log("product is", params);


    const fetchProductDetails = async () => {
        setLoading(true);
        const fetchData = await fetch(summaryApi.productDeatils.url, {
            method: summaryApi.productDeatils.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                productId: params?.id
            })
        })
        setLoading(false);
        const dataResponse = await fetchData.json()
        setData(dataResponse?.data)
        setActiveImage(dataResponse?.data?.productImage[0])
    }
    console.log("data", data)

    useEffect(() => {
        fetchProductDetails()
    }, [params])

    const handleMouseEnterProduct = (imgURL) => {
        setActiveImage(imgURL)
    }

    const handleZoomImage = useCallback((e) => {
        setZoomImage(true)
        const { left, top, width, height } = e.target.getBoundingClientRect();
        console.log("Coordinate", left, top, width, height)

        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height
        setZoomImageCoordinate({
            x,
            y
        })
    }, [zoomImageCoordinate])


    const handleLeaveImageZoom = () => {
        setZoomImage(false)
    }

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    return (
        <div className='container mx-auto p-4'>
            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
                {/* produc img */}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
                    <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                        <img src={activeImage} className='w-full h-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />

                        {/* product image zoom */}
                        {
                            zoomImage && (
                                <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                                    <div
                                        className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-100'
                                        style={{
                                            backgroundImage: `url(${activeImage})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                                        }}
                                    >
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className='h-full'>
                        {
                            loading ? (
                                <div className='flex gap-3 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        productImageListLoading.map(el => {
                                            return (
                                                <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"}></div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <div className='flex gap-3 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        data?.productImage?.map((imgURL, index) => {
                                            return (
                                                <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                                                    <img src={imgURL} className='w-full h-full mix-blend-multiply object-scale-down cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgURL)} onClick={() => handleMouseEnterProduct(imgURL)} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                {/* product details */}
                {
                    loading ? (
                        <div className='grid gap-1 w-full'>
                            <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
                            <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
                            <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>
                            <div className='text-slate-400 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>
                            </div>
                            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
                                <p className='text-slate-400 bg-slate-200 w-full'></p>
                                <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
                            </div>
                            <div className='flex items-center gap-3 my-2 w-full'>
                                <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                                <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                            </div>
                            <div className='w-full'>
                                <p className='text-slate-400 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full'></p>
                                <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-1'>
                            <p className='bg-black text-white rounded-full px-2 w-fit'>{data?.brandName}</p>
                            <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                            <p className='text-slate-400 capitalize'>{data?.category}</p>

                            <div className='flex items-center gap-1'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStarHalfAlt />
                            </div>
                            <div className='flex items-center gap-2 text-2xl lg:text-3xl my-1   font-medium'>
                                <p>{displayINRCurrency(data?.sellingPrice)}</p>
                                <p className='line-through text-gray-400'>{displayINRCurrency(data?.price)}</p>
                            </div>

                            <div className='flex items-center gap-3 my-2'>
                                <button className='border-2 rounded border-black px-3 py-1 min-w-[120px] hover:bg-black font-medium hover:text-white'>Buy</button>
                                <button className='border-2 rounded border-black px-3 py-1 min-w-[120px] bg-black text-white hover:bg-white font-medium hover:text-black' onClick={(e) => handleAddToCart(e, data?._id)}>Add To Cart</button>
                            </div>
                            <div>
                                <p className='text-slate-600 font-medium my-1'>Description : </p>
                                <p>{data?.description}</p>
                            </div>
                        </div>
                    )
                }
            </div>

            {
                data?.category && (
                    <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Products"} />
                )
            }
        </div>
    )
}
export default ProductDetails