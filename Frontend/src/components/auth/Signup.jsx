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
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

  const [input, setinput] = useState({
    fullname: "", // aa che e Input vadi field ma name="fullname" che e che , bane na name same hova joie
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });

  const navigate = useNavigate();
  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value }); // ahiya name a badle fullname,email,password etc. avtu jase ane user e je nakhyu hase ena thi update thai jse
  }

  const changeFileHandler = (e) => {
    setinput({ ...input, file: e.target.files?.[0] }); // ahiya list pass thati hase etle agar file upload kari hase to pehli file aai jase, ane nahi upload kari hoy to error ahi aape
  }

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/; // Only 10 digits
    return phoneRegex.test(phone);
  };

  const submitHandler = async (e) => {
    e.preventDefault(); // ana thi page reload nahi thay 
    if (!validatePhoneNumber(input.phoneNumber)) {
      toast.error("Phone number must be exactly 10 digits and contain only numbers.");
      return;
    }
    const formData = new FormData();
    formData.append("fullname", input.fullname); // aa bar nu fullname che e backend ma mode na name sathe match thavu joie
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      // .post()-> aa method 3 arguments le che URL, data,config
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });
      if (res.data.success) // res.data thi backend ma je model banyo che e aakho aavse ane ema success true rakhyu tu e ave to niche nu execute karvau
      {
        navigate("/login"); // success thay to login page uper jata revanu 
        toast.success(res.data.message) // backend ma darek ma message rakhyo che e aavse niche right side bottom ma
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false))
    }
  }
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [])
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
          <div className='my-2'>
            <Label className='font-bold'>Full Name<span className='text-red-500'>*</span></Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname} // aa value che e e.target.value ama store thase ane e.target.name -> fullname=value evu thase 
              // ahiya name ma je fullname che input.. karine je fullname che eni sathe match thavu joie 
              onChange={changeEventHandler}
              placeholder="xyz"
            />
          </div>
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
            <Label className='font-bold'>Phone Number<span className='text-red-500'>*</span></Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="+91 999999999"
              maxLength={10}
            />
            <div className='my-2'>
              <Label className='font-bold'>Password<span className='text-red-500'>*</span></Label>
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
              <div className='flex items-center gap-2'>
                <Label>Profile:<span className='text-red-500'>*</span></Label>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>

          {
            loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait</Button> :
              <Button type="submit" style={{ borderRadius: '0.375rem' }} variant="outline" className="bg-black w-full my-4 text-white border-gray-300">SignUp</Button>
          }

          <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Signup