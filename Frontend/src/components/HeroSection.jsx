import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query,setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchQuery(query));
        navigate("/browse")
    }



    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='px-4 py-2 rounded-full bg-gray-100 text-[#F83002] mx-auto'>No.1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Job</span></h1>
            </div>
            <p className='mb-8 text-gray-400 max-w-[580px] mx-auto'> Explore thousands of job opportunities tailored to your skills and interests, filter by location, industry, and salary, and apply effortlessly with just a few clicks.💼</p>
            <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                <input
                    type="text"
                    placeholder='Find Your Dream Job!'
                    onChange={(e) => setQuery(e.target.value)}
                    className='outline-none border-none w-full'
                />
                <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                    <Search className='h-5 w-5' />
                </Button>
            </div>
        </div>
    )
}

export default HeroSection