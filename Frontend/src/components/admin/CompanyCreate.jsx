import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
        headers: {
          'content-Type': 'application/json'
        },
        withCredentials: true
      });
      //console.log(res)
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        console.log(res)
        toast.success(res.data.message, {
                            position: 'top-center', // Set desired position
                            duration: 4000, // Duration of the toast
                        });
        const companyId = res?.data?.company?._id;
       // console.log(res.data)
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto'>
        <div className='my-10'>
          <h1 className='font-bold text-2xl'>Your Company Name</h1>
          <p className='text-gray-500'>What would you like to keep your company name? You can change this later.</p>
        </div>


        <Label>Comapany Name</Label>
        <Input
          type='text'
          className='my-2'
          placeholder='JobHunt, Microsoft etc.'
          style={{ borderRadius: '0.375rem' }}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className='flex items-center gap-2 my-10'>
          <Button onClick={() => navigate("/admin/companies")} variant='outline' style={{ borderRadius: '0.375rem' }}>Cancel</Button>
          <Button onClick={registerNewCompany} style={{ borderRadius: '0.375rem' }} className="bg-black text-white hover:bg-black" >Continue</Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate