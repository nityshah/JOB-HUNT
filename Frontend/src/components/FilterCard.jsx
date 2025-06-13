import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'


const filterData = [
  {
    filterType: "Location",
    arraya: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    arraya: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  // {
  //   filterType: "Salary",
  //   arraya: ["0-40k", "42k-11lakh", "1lakh to 5lakh"]
  // }

]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  }

  useEffect(() => {
    // console.log(selectedValue);
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          filterData.map((data, index) => (
            <div className='w-full bg-white  rounded-md'>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.arraya.map((item, idx) => {
                  // console.log(item,idx);
                  const itemId = `id${index}-${idx}`
                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard




