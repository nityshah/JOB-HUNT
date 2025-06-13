import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    
const {allAppliedJobs} = useSelector(store => store.job);
  return (
    <div>
        <Table>
            <TableCaption>A list of your applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
               {
                     allAppliedJobs.length <=0 ? <span>You haven't applied for any job yet!</span> : allAppliedJobs.map((allAppliedJobs) => (
                        <TableRow key={allAppliedJobs._id}>
                            <TableCell>{allAppliedJobs.createdAt.split("T")[0]}</TableCell>
                            <TableCell>{allAppliedJobs.job.title}</TableCell>
                            <TableCell>{allAppliedJobs.job.company.name}</TableCell>
                            <TableCell className="text-right"><Badge className={`${allAppliedJobs?.status == "rejected" ? 'bg-red-400' : allAppliedJobs.status == "pending" ? 'bg-gray-400' : 'bg-green-400'}`} variant="outline">{allAppliedJobs.status.toUpperCase()}</Badge></TableCell>
                        </TableRow>
                     ))
               }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTable