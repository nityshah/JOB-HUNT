// import React, { useEffect, useState } from 'react'
// import { Badge } from './ui/badge'
// import { Button } from './ui/button'
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
// import { setSingleJob } from '@/redux/jobSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'sonner';

// const JobDescription = () => {
    
//     const params = useParams();
//     const jobId = params.id;
//     const {singleJob} = useSelector(store => store.job);
//     const {user} = useSelector(store => store.auth)
//     const dispatch = useDispatch();



//     const applyJobHandler = async () => {
//         try {
//             const res= await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true})
//             if(res.data.success)
//             {
//                 toast.success(res.data.message);
//                 setIsApplied(true); // update the local state
//                 const updateSingleJob = {...singleJob, applications:[...singleJob.applications, user?._id]}
//                 // {applicant:user?._id}
//                 dispatch(setSingleJob(updateSingleJob)); // ana thi UI par button change thase
//                 console.log(res.data);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         }
//     }


//     useEffect(() => {
//         const fetchSingleJob = async () => {
//             try {
//                 const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
//                 console.log(res);
                
                
//                 if(res.data.success)
//                 {
//                     dispatch(setSingleJob(res.data.getJob));
//                     setIsApplied(res.data.getJob.applications.some(application => application.applicant == user?._id)) // ensure the state is in sync with fetched data
//                     // setIsApplied(res.data.getJob.applications.includes(user?._id));
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchSingleJob();
//     },[jobId,dispatch,user?._id])


//     const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant == user?._id) || false;
//     // const isInitiallyApplied = singleJob?.applications?.includes(user?._id) || false;
//     const [isApplied,setIsApplied] = useState(isInitiallyApplied);
//     return (
//         <div className='max-w-7xl mx-auto my-10 px-14 '>
//             {/* px-14 */}
//             <div className='flex items-center justify-between'>
//                 <div>
//                     <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
//                     <div className='flex items-center gap-4 mt-4 '>
//                         <Badge className={"text-blue-700 font-bold"} variant="ghost">{singleJob?.position} Positions</Badge>
//                         <Badge className={"text-[#F83002] font-bold"} variant="ghost">{singleJob?.jobType}</Badge>
//                         <Badge className={"text-[#7209b7]  font-bold"} variant="ghost">{singleJob?.salary} LPA</Badge>
//                     </div>
//                 </div>
//                 <Button
//                 onClick = {isApplied ? null : applyJobHandler}
//                 disabled={isApplied} className={`${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"} text-white`} variant="outline" style={{ borderRadius: '0.375rem' }}>
//                     {isApplied ? "Already Applied" : "Apply Now"}
//                 </Button>
//             </div>
//             <h1 className='border-b-2 border-b-gray-300 font-gray pt-10'>Job Description</h1>



//             {/* <div>
//                 <h1 className='font-bold my-1'>Role:</h1> <span className=' pl-4 font-normal text-gray-800'>Frontend Developer</span>
//                 <h1 className='font-bold my-1'>Location:</h1> <span className=' pl-4 font-normal text-gray-800'>Hyderabad</span>
//                 <h1 className='font-bold my-1'>Description:</h1> <span className=' pl-4 font-normal text-gray-800'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, ipsum.</span>
//                 <h1 className='font-bold my-1'>Experience:</h1> <span className=' pl-4 font-normal text-gray-800'>2 yrs</span>
//                 <h1 className='font-bold my-1'>Salary:</h1> <span className=' pl-4 font-normal text-gray-800'>12LPA</span>
//                 <h1 className='font-bold my-1'>Total Applicants:</h1> <span className=' pl-4 font-normal text-gray-800'>4</span>
//                 <h1 className='font-bold my-1'>Posted Date:</h1> <span className=' pl-4 font-normal text-gray-800'>17-07-2024</span>
//             </div> */}


// <div className='space-y-2 mt-7'>
//                 <div className='flex items-center'>
//                     <h1 className='font-bold'>Role:</h1> 
//                     <span className='pl-2 font-normal text-gray-800'>{singleJob?.title}</span>
//                 </div>
//                 <div className='flex items-center'>
//                     <h1 className='font-bold'>Location:</h1> 
//                     <span className='pl-2 font-normal text-gray-800'>{singleJob?.location}</span>
//                 </div>
//                 <div className='flex items-center'>
//                     <h1 className='font-bold'>Description:</h1> 
//                     <span className='pl-2 font-normal text-gray-800'>{singleJob?.description}</span>
//                 </div>
//                 <div className='flex items-center'>
//                     <h1 className='font-bold'>Experience:</h1> 
//                     <span className='pl-2 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span>
//                 </div>
//                 <div className='flex items-center'>
//                     <h1 className='font-bold'>Salary:</h1> 
//                     <span className='pl-2 font-normal text-gray-800'>{singleJob?.salary} LPA</span>
//                 </div>
//                 <div className='flex items-center'>
//                     <h1 className='font-bold'>Total Applicants:</h1> 
//                     <span className='pl-2 font-normal text-gray-800'>{singleJob?.applications?.length}</span>
//                 </div>
//                 <div className='flex items-center'>
//                     <h1 className='font-bold'>Posted Date:</h1> 
//                     <span className='pl-2 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span>
//                 </div>
//             </div>


//         </div>
//     )
// }

// export default JobDescription


import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [isApplied, setIsApplied] = useState(false);

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.getJob));

                    // ✅ Update isApplied only after job and user are available
                    if (user?._id) {
                        const alreadyApplied = res.data.getJob.applications.some(
                            application => application.applicant === user._id
                        );
                        setIsApplied(alreadyApplied);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (jobId && user?._id) {
            fetchSingleJob();
        }
    }, [jobId, dispatch, user?._id]);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                toast.success(res.data.message);
                setIsApplied(true);

                const updatedJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user._id }]
                };
                dispatch(setSingleJob(updatedJob));
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className='max-w-7xl mx-auto my-10 px-14 '>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-4 mt-4 '>
                        <Badge className={"text-blue-700 font-bold"} variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge className={"text-[#F83002] font-bold"} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={"text-[#7209b7]  font-bold"} variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"} text-white`}
                    variant="outline"
                    style={{ borderRadius: '0.375rem' }}
                >
                    {isApplied ? "Already Applied" : "Apply Now"}
                </Button>
            </div>

            <h1 className='border-b-2 border-b-gray-300 font-gray pt-10'>Job Description</h1>

            <div className='space-y-2 mt-7'>
                <div className='flex items-center'>
                    <h1 className='font-bold'>Role:</h1>
                    <span className='pl-2 font-normal text-gray-800'>{singleJob?.title}</span>
                </div>
                <div className='flex items-center'>
                    <h1 className='font-bold'>Location:</h1>
                    <span className='pl-2 font-normal text-gray-800'>{singleJob?.location}</span>
                </div>
                <div className='flex items-center'>
                    <h1 className='font-bold'>Description:</h1>
                    <span className='pl-2 font-normal text-gray-800'>{singleJob?.description}</span>
                </div>
                <div className='flex items-center'>
                    <h1 className='font-bold'>Experience:</h1>
                    <span className='pl-2 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span>
                </div>
                <div className='flex items-center'>
                    <h1 className='font-bold'>Salary:</h1>
                    <span className='pl-2 font-normal text-gray-800'>{singleJob?.salary} LPA</span>
                </div>
                <div className='flex items-center'>
                    <h1 className='font-bold'>Total Applicants:</h1>
                    <span className='pl-2 font-normal text-gray-800'>{singleJob?.applications?.length}</span>
                </div>
                <div className='flex items-center'>
                    <h1 className='font-bold'>Posted Date:</h1>
                    <span className='pl-2 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;
