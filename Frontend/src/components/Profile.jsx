import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAllAppliedJobs from '@/hooks/useGetAllAppliedJobs'

// const Skills = ["HTML", "CSS", "JS", "REACTJS"]
const isHaveResume = true;

const Profile = () => {

    useGetAllAppliedJobs();

    const [open, setOpen] = useState(false);

    const { user } = useSelector(store => store.auth);
    console.log(user);
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-10'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto || "https://tse1.mm.bing.net/th?id=OIP.302zgzUHVpOuGmsmRZudiAHaHk&pid=Api&P=0&h=180"} />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} style={{ borderRadius: '0.375rem' }} variant="outline" className="bg-white border border-gray-300 text-right"><Pen /></Button>
                </div>
                <div className='my-5'>


                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>

                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>


                </div>

                <div>
                    {/* uper vada div ma my-5 add karyu che pan me nathi karyu */}
                    <h1 className='my-2'>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} variant="outline" className="bg-black text-white">{item}</Badge>) :
                                <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>



                    {/* <Label className="text-md font-bold mt-5">Resume</Label> */}
                        {/* {
                            isHaveResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer '>{user?.profile?.resumeOriginalName}</a> :
                            <span>NA</span>
                        } */}




                    <Label className="text-md font-bold mt-5">Resume</Label>
                    {
                        user?.profile?.resume ?
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                // href={user?.profile?.resume}
                                href={user?.profile?.resume}
                                className='text-blue-500 w-full hover:underline cursor-pointer'>
                                {user?.profile?.resumeOriginalName || 'View Resume'}
                            </a> :
                            <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Application Table */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile