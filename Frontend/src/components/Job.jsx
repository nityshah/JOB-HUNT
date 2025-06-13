// import React from 'react'
// import { Button } from './ui/button'
// import { Bookmark } from 'lucide-react'
// import { Avatar, AvatarImage } from './ui/avatar'
// import { Badge } from './ui/badge'
// import { useNavigate } from 'react-router-dom'




// // const createdAtDate = new Date(singleJob?.createdAt);
// // const currentDate = new Date();
// // const timeDifference = currentDate - createdAtDate;
// // const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert from milliseconds to days

// const daysAgoFunction = (mongodbTime) => {
//     const createdAt = new Date(mongodbTime);
//     const currentTime = new Date();
//     const timeDifference = currentTime - createdAt;
//     return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
// }



// const Job = ({ job }) => {
//     const navigate = useNavigate();
//     // const jobId = "nitya";
//     return (
//         <div className='p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer'>
//             <div className='flex items-center justify-between'>
//                 <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) == 0 ? "Today" : `${daysAgoFunction
//                     (job?.createdAt)
//                     }`} days ago </p>
//                 <Button className="rounded-full border border-none" size="icon"><Bookmark style={{ width: '24px', height: '24px' }} /></Button>
//             </div>
//             <div className='flex items-center gap-2 my-2'>
//                 <Button>
//                     {/* <Avatar>
//                         <AvatarImage src={job?.company?.logo} />
//                     </Avatar> */}
//                     <div
//                         style={{
//                             width: '48px', // Square shape
//                             height: '48px',
//                             borderRadius: '8px', // Slightly rounded corners
//                             overflow: 'hidden', // Ensures the image stays within bounds
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             backgroundColor: '#f1f1f1', // Optional: Background for better visibility
//                         }}
//                     >
//                         <img
//                             src={job?.company?.logo}
//                             alt="Company Logo"
//                             style={{
//                                 width: '100%',
//                                 height: '100%',
//                                 objectFit: 'contain', // Ensures the logo fits properly
//                             }}
//                         />
//                     </div>
//                 </Button>
//                 <div>
//                     <h1 className='font-medium text-lg'> {job?.company?.name}</h1>
//                     <p className='text-sm text-gray-500'>{job?.location}</p>
//                 </div>
//             </div>
//             <div>
//                 <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
//                 <p className='text-sm text-gray-700'>{job?.description}</p>
//             </div>
//             <div className='flex items-center gap-4 mt-4 '>
//                 <Badge className={"text-blue-700 font-bold"} variant="ghost">{job?.position} Positions</Badge>
//                 <Badge className={"text-[#F83002] font-bold"} variant="ghost">{job?.jobType}</Badge>
//                 <Badge className={"text-[#7209b7]  font-bold"} variant="ghost">{job?.salary} LPA</Badge>
//             </div>
//             <div className='flex items-center gap-4 mt-4'>
//                 <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" style={{ borderRadius: '0.375rem' }}>Details</Button>
//                 <Button variant="outline" className="bg-[#7209b7] text-white" style={{ borderRadius: '0.375rem' }}>Save for Later</Button>
//             </div>
//         </div>
//     )
// }

// export default Job  


import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const daysAgoFunction = (mongodbTime) => {
  const createdAt = new Date(mongodbTime);
  const currentTime = new Date();
  const timeDifference = currentTime - createdAt;
  return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days
};

const Job = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button className="rounded-full border border-none" size="icon">
          <Bookmark style={{ width: '24px', height: '24px' }} />
        </Button>
      </div>
      <div className='flex items-center gap-2 my-2'>
        <Button>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f1f1f1',
          }}>
            <img
              src={job?.company?.logo}
              alt="Company Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-700'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Badge className={"text-blue-700 font-bold"} variant="ghost">{job?.position} Positions</Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">{job?.jobType}</Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">{job?.salary} LPA</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" style={{ borderRadius: '0.375rem' }}>Details</Button>
        <Button variant="outline" className="bg-[#7209b7] text-white" style={{ borderRadius: '0.375rem' }}>Save for Later</Button>
      </div>
    </div>
  );
};

export default Job;
