import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'


const Login = () => {
  const [input, setinput] = useState({
    email: "",
    password: "", // ahiya je name che e name same j hova joie backend na model ma bcoz aa req.body ma store thase
    role: "",// ane ema thi j aapde data xtract krie che  
  });

  const { loading,user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value }); // ahiya name a badle fullname,email,password etc. avtu jase ane user e je nakhyu hase ena thi update thai jse
  }


  const submitHandler = async (e) => {
    e.preventDefault(); // ana thi page reload nahi thay 
    try {
      // .post()-> aa method 3 arguments le che URL, data,config
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      if (res.data.success) // res.data thi backend ma je model banyo che e aakho aavse ane ema success true rakhyu tu e ave to niche nu execute karvau
      {
        dispatch(setUser(res.data.user))
        navigate("/"); // aa success thay to login page uper javanu
        // toast.success(res.data.message) // backend ma darek ma message rakhyo che e aavse niche right side bottom ma
        toast.success(res.data.message, {
          position: 'top-center', // Set desired position
          duration: 3000, // Duration of the toast
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
  useEffect(() => {
    if(user) {
      navigate("/");
    }
  },[])

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'> Login </h1>

          <div className='my-2'>
            <Label className='font-bold'>Email<span className='text-red-500'>*</span></Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="abc@gmail.com"
            />
          </div>

          <div className='my-2'>
            <Label className='font-bold'>Password<span className='text-red-600'>*</span></Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="******"
            />
          </div>
          <div className='flex items-center justify-between'>
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">

                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role == 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role == 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>

          </div>

          {
            loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait</Button> :
              <Button type="submit" style={{ borderRadius: '0.375rem' }} variant="outline" className="bg-black w-full my-4 text-white border-gray-300">Login</Button>
          }
          <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>SignUp</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login