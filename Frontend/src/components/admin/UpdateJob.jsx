import useFetchSingleJob from '@/hooks/useFetchSingleJob';
import { setfetchId } from '@/redux/jobSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
// import { toast } from 'sonner';


const UpdateJob = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    dispatch(setfetchId(params.id));
    useFetchSingleJob();
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experienceLevel: "",
        position: 0
    });
    const { companies } = useSelector(store => store.company);
    const { fetchSingleJob } = useSelector(store => store.job);
    const [loading, setLoading] = useState(false);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() == value);
        setInput({ ...input, companyId: selectedCompany._id });
    }
    // console.log(fetchSingleJob)
    // useEffect(() => {
    //     setInput({
    //         title: fetchSingleJob.title || "",
    //         description: fetchSingleJob.description || "",
    //         requirements: fetchSingleJob.requirements || "",
    //         salary: fetchSingleJob.salary || "",
    //         location: fetchSingleJob.location || "",
    //         jobType: fetchSingleJob.jobType || "",
    //         experienceLevel: fetchSingleJob.experienceLevel || "",
    //         position: fetchSingleJob.position || "",
    //     }, [fetchSingleJob]);
    // })
    useEffect(() => {
        setInput({
            title: fetchSingleJob?.title || "",
            description: fetchSingleJob?.description || "",
            requirements: fetchSingleJob?.requirements || "",
            salary: fetchSingleJob?.salary || "",
            location: fetchSingleJob?.location || "",
            jobType: fetchSingleJob?.jobType || "",
            experienceLevel: fetchSingleJob?.experienceLevel || "",
            position: fetchSingleJob?.position || 0,
        });
    }, [fetchSingleJob]);

    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log(input);
        const formData = new FormData();
        formData.append("title", input.title);
        formData.append("description", input.description);
        formData.append("requirements", input.requirements);
        formData.append("location", input.location);
        formData.append("salary", input.salary);
        formData.append("jobType", input.jobType);
        formData.append("experienceLevel", input.experienceLevel);
        formData.append("position", input.position);
        console.log(input);
        try {
            setLoading(true);
            const res = await axios.put(`${JOB_API_END_POINT}/updatejob/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log(res);
            //   console.log(res.data);
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }




    // const submitHandler = async (e) => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append("title", input.title || "");
    //     formData.append("description", input.description || "");
    //     formData.append("requirements", input.requirements || "");
    //     formData.append("location", input.location || "");
    //     formData.append("salary", input.salary || "");
    //     formData.append("jobType", input.jobType || "");
    //     formData.append("experienceLevel", input.experienceLevel || "");
    //     formData.append("position", input.position || "");

    //     // Debugging: Log FormData
    //     for (let pair of formData.entries()) {
    //         console.log(pair[0] + ': ' + pair[1]);
    //     }

    //     try {
    //         setLoading(true);
    //         const res = await axios.put(`${JOB_API_END_POINT}/updatejob/${params.id}`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             },
    //             withCredentials: true
    //         });

    //         console.log(res);
    //         if (res.data.success) {
    //             toast.success(res.data.message);
    //             navigate("/admin/jobs");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error(error.response?.data?.message || "Something went wrong");
    //     } finally {
    //         setLoading(false);
    //     }
    // };




    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border  border-gray-200 shadow-lg rounded-md' style={{ borderRadius: '0.375rem' }}>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                style={{ borderRadius: '0.375rem' }}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                style={{ borderRadius: '0.375rem' }}
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                style={{ borderRadius: '0.375rem' }}
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                style={{ borderRadius: '0.375rem' }}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                style={{ borderRadius: '0.375rem' }}
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                style={{ borderRadius: '0.375rem' }}
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experienceLevel"
                                value={input.experienceLevel}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                style={{ borderRadius: '0.375rem' }}
                            />
                        </div>
                        <div>
                            <Label>No. of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                style={{ borderRadius: '0.375rem' }}
                            />
                        </div>
                        {/* {
                            companies.length >= 0 && (
                                <div className='col-span-2 relative z-50'>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent className="absolute mt-1 bg-white border rounded-md shadow-lgw-[320px] max-h-[320px] overflow-y-auto z-50"
                                            style={{ maxHeight: '300px', overflowY: 'auto', cursor: 'ns-resize', height: 'auto' }}

                                        >
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => {
                                                        return (
                                                            <SelectItem
                                                                className="min-w-full whitespace-nowrap overflow-hidden text-ellipsis px-4 py-2 hover:bg-gray-600 cursor-pointer"
                                                                value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        } */}
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait</Button> :
                            <Button type="submit" style={{ borderRadius: '0.375rem' }} variant="outline" className="bg-black w-full my-4 text-white border-gray-300">Update Job</Button>
                    }
                    {
                        companies.length == 0 && <p className='text-xs text-red-600 text-center font-bold my-3'>*Please register a company first, before posting a job</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default UpdateJob