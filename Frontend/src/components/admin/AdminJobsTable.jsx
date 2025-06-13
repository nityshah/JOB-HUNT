import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    // initailly filterCompany name na variable ma badhi company nakhi didhi 
    // etle have je changes karisu e variable ma thase original companines ma nahi thay

    useEffect(() => {
        const filteredCompany = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true; // ana matlab che ke agar koi e kai lakhyu j nathi to badhi return karvani  
            };
            return job?.name?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
            ;
        });
        setFilterJobs(filteredCompany);
    }, [allAdminJobs, searchJobByText]); // jyare pan aa be vastu change thase tyare useEffect call thase
    // ahiya companies etle nakhyu ke jyare navi company add thay ena mate pan filter vadu logic kam karvu joie

    return (
        <div>
            <Table >
                <TableCaption>A list of your Posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* {
                        companies.length <=0 ? <span>You haven't registered any company yet!</span>
                        :
                        (
                            

                            companies?.map((company) => (
                                <TableRow key={company._id}>
                                  <TableCell>
                                    <Avatar>
                                      <AvatarImage src="https://tse3.mm.bing.net/th?id=OIP.uEH8j0EiPnDk9E6st4axNwHaHa&pid=Api&P=0&h=180" />
                                    </Avatar>
                                  </TableCell>
                                  <TableCell>{company.name}</TableCell>
                                  <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                  <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                      <PopoverTrigger>
                                        <MoreHorizontal />
                                      </PopoverTrigger>
                                      <PopoverContent className="w-32">
                                        <div className="flex items-center gap-2 w-fit cursor-pointer">
                                          <Edit2 className="w-4" />
                                          <span>Edit</span>
                                        </div>
                                      </PopoverContent>
                                    </Popover>
                                  </TableCell>
                                </TableRow>
                              ))





                        )
                    } */}
                    {
                        filterJobs?.map((job) => (
                            <tr>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-35 py-2 shadow-lg bg-white border rounded-md"
                                            style={{
                                                zIndex: 50, // Ensure it's above other content
                                                position: 'absolute',
                                                top: '100%', // Positions the popover directly below the trigger
                                                left: '-60px', // Aligns with the left edge of the trigger
                                                // transform: 'translateY(8px)', // Adjust for a slight gap between the trigger and popover
                                            }} >
                                            {/* className="w-32" */}
                                            <div className="flex items-center gap-2 w-fit cursor-pointer">
                                                <Edit2 className="w-4" />
                                                <span onClick={() => navigate(`/admin/job/${job._id}`)}>Edit</span>
                                            </div>
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}  className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    }
                    {/* <TableCell>
                        <Avatar>
                            <AvatarImage src="https://tse3.mm.bing.net/th?id=OIP.uEH8j0EiPnDk9E6st4axNwHaHa&pid=Api&P=0&h=180" />
                        </Avatar>
                    </TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>18-07-2024</TableCell>
                    <TableCell className="text-right cursor-pointer">
                        <Popover>
                            <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                            <PopoverContent className="w-32">
                                <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                    <Edit2 className='w-4'/>
                                    <span>Edit</span>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </TableCell>  */}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable