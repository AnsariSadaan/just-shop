import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalProduct from '../components/VerticalProduct'
import summaryApi from '../utils/backendDomain'


const CategoryProduct = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const URLSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = URLSearch.getAll("category")
    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true
    })
    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCtaegoryList] = useState([])

    const [sortBy, setSortBy] = useState('')

    const fetchData = async () => {
        const response = await fetch(summaryApi.filterProduct.url, {
            method: summaryApi.filterProduct.method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                category: filterCategoryList
            })
        });

        const dataResponse = await response.json()
        setData(dataResponse?.data || []);
    }

    const handleSelectCategory = (e) => {
        const { name, value, checked } = e.target
        setSelectCategory((prev) => {
            return {
                ...prev,
                [value]: checked
            }
        })
    }


    useEffect(() => {
        fetchData()
    }, [filterCategoryList])

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).map(categorykeyName => {
            if (selectCategory[categorykeyName]) {
                return categorykeyName
            }
            return null
        }).filter(el => el)
        setFilterCtaegoryList(arrayOfCategory)
        //format for url change
        const urlFormat = arrayOfCategory.map((el, index) => {
            if ((arrayOfCategory.length - 1) === index) {
                return `category=${el}`
            }
            return `category=${el}&&`
        })
        navigate("/product-category?" + urlFormat.join(''))
        //  product - category ? category = camera && category=mobile

    }, [selectCategory])

    const handleOnChangeSortBy = (e)=>{
        const {value} = e.target

        setSortBy(value)

        if(value === 'asc'){
            setData(preve => preve.sort((a,b)=> a.sellingPrice - b.sellingPrice))
        }

        if(value === 'dsc'){
            setData(preve => preve.sort((a,b)=> b.sellingPrice - a.sellingPrice))
        }
    }

    useEffect(()=> {

    }, [sortBy])


    return (
        <div className='container mx-auto p-4'>
            {/* desktop version */}
            <div className='hidden lg:grid grid-cols-[200px,1fr]'>
                {/* left side */}
                <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
                    {/* sort by */}
                    <div className=''>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-400'>Sort by</h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            <div className='flex items-center gap-3'>
                                <input type="radio" name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={'asc'}/>
                                <label>Price - Low to High</label>
                            </div>
                            <div className='flex items-center gap-3'>
                                <input type="radio" name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={'dsc'} />
                                <label>Price - High to Low</label>
                            </div>
                        </form>
                    </div>

                    {/* filter by */}
                    <div className=''>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-400'>Category</h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            {
                                productCategory.map((categoryName, index) => {
                                    return (
                                        <div key={index} className='flex items-center gap-3'>
                                            <input
                                                type="checkbox"
                                                name={"category"}
                                                checked={selectCategory[categoryName?.value]}
                                                value={categoryName?.value}
                                                id={categoryName?.value}
                                                onChange={handleSelectCategory} />
                                            <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                                        </div>
                                    )
                                })
                            }
                        </form>
                    </div>
                </div>
                {/* right side (product)*/}
                <div className='px-4'>
                    <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>
                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                        {
                            data.length !== 0 && (
                                <VerticalProduct data={data} loading={loading} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryProduct