import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company)
    const [filterCompany,setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    // initailly filterCompany name na variable ma badhi company nakhi didhi 
    // etle have je changes karisu e variable ma thase original companines ma nahi thay

    useEffect(() => {
            const filteredCompany = companies.length >=0 && companies.filter((company) => {
                if(!searchCompanyByText){
                    return true; // ana matlab che ke agar koi e kai lakhyu j nathi to badhi return karvani  
                };
                return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
            });
            setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText]); // jyare pan aa be vastu change thase tyare useEffect call thase
    // ahiya companies etle nakhyu ke jyare navi company add thay ena mate pan filter vadu logic kam karvu joie

    return (
        <div>
            <Table >
                <TableCaption>A list of your registered companies</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
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
                        filterCompany?.map((company) => (
                            <tr>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={company.logo} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-28 py-2 shadow-lg" style={{ zIndex: 10 }} >
                                            {/* className="w-32" */}
                                                <div className="flex items-center gap-2 w-fit cursor-pointer">
                                                    <Edit2 className="w-4" />
                                                    <span onClick={() => navigate(`/admin/companies/${company._id}`)}>Edit</span>
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
                    </TableCell> */ }

                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable