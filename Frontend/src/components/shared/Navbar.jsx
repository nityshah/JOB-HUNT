import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from "@/components/ui/button"
import React from 'react'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'



const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");

                toast.success(res.data.message, {
                    position: 'top-center', // Set desired position
                    duration: 4000, // Duration of the toast
                });
            }
        } catch (error) {
            console.log(error);
            console.log(error.response.data.message);
        }
    }

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-16'>
                {/* aa div ma left vado part che ene ek div ma mukyu che */}
                <div className='cursor-pointer' onClick={() => navigate("/")}>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>

                {/* // aa right vado part che Navbar no */}

                <div className='flex items-center gap-12'>
                    <ul className='flex items-center font-medium gap-5'>
                        {
                            user && user.role == 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) :
                                (
                                    <>
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/jobs">Jobs</Link></li>
                                        <li><Link to="/browse">Browse</Link></li>
                                    </>
                                )
                        }

                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button style={{ borderRadius: '0.375rem' }} variant="outline" className="bg-white border border-gray-300">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white" style={{ borderRadius: '0.375rem' }}>Signup</Button></Link>

                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt='@shadcn' className='w-8 h-8 object-cover rounded-full' />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80 p-4 border border-gray-200 rounded-md shadow-lg z-50 bg-white' align="end" sideOffset={8} side="bottom" avoidCollisions={true}>
                                    <div className='flex items-center gap-4 space-y-2'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt='@shadcn' className='w-8 h-8 object-cover rounded-full' />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>



                                    {/* <div>
                                <Button variant="link">View Profile </Button>
                                <Button variant="link">Logout </Button>
                            </div> */}



                                    <div className='mt-4 space-y-1'> {/* Vertical spacing between buttons */}

                                        {
                                            user && user.role == 'student' && (
                                                <div className='flex items-center'>
                                                    <User2 className='mr-2' /> {/* Icon for View Profile */}
                                                    <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                                </div>
                                            )
                                        }



                                        <div className='flex items-center'>
                                            <LogOut className='mr-2' /> {/* Icon for Logout */}
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>


                                </PopoverContent>
                            </Popover>
                        )
                    }



                </div>
            </div>

        </div>
    )
}
// p-4 flex items-center gap-4
export default Navbar