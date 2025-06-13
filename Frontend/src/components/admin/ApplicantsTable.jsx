import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';



const shortListingStatus = ["accepted", "rejected"];


const ApplicantsTable = () => {

    const { applicants } = useSelector(store => store.application)

    // console.log(applicants);
    const statusHandler = async (status,id) => {
        try {
            // console.log('Sending request to update status:', status, 'for ID:', id);
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status});    
            // console.log('Sending request to update status:', status, 'for ID:', id);     
            if(res.data.message)
            {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }



    return (
        <div>
            <Table>
                <TableCaption>A list of your recently applied user</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell >
                                    {
                                        item?.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a>
                                        :
                                        <span>NA</span>
                                    }
                                    </TableCell>
                                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableHead className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32'
                                            style={{
                                                zIndex: 50, // Ensure it's above other content
                                                position: 'absolute',
                                                top: '100%', // Positions the popover directly below the trigger
                                                left: '-80px', // Aligns with the left edge of the trigger
                                                // transform: 'translateY(8px)', // Adjust for a slight gap between the trigger and popover
                                            }}
                                        >
                                            {
                                                shortListingStatus.map((status, index) => {
                                                    return (
                                                        <div   key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                            <span onClick={() => statusHandler(status,item?._id)} >{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableHead>
                            </tr>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable