import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetUp from './components/admin/CompanySetUp'
import AdminJobs from './components/admin/AdminJobs'; // ahiya import ma kai pan name lakhay 
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import UpdateJob from './components/admin/UpdateJob'
import RouteProtect from './components/admin/RouteProtect'
import ProtectHomePage from './components/admin/ProtectHomePage'
// evu jaruri nathi ke koi particular name apvu

const appRouter = createBrowserRouter([
  {
      path:"/",
      element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
},
{
  path:"/signup",
  element:<Signup/>
},
{
  path:"/jobs",
  element:<ProtectHomePage><Jobs/></ProtectHomePage>
},
{
  path:"/description/:id",
  element:<ProtectHomePage><JobDescription/></ProtectHomePage>
},
{
  path:"/browse",
  element:<ProtectHomePage><Browse/></ProtectHomePage>
},
{
  path:"/profile",
  element:<Profile/>
},


// uper nu hatu e user mate hatu have niche che e admin mate che


{
  path:"/admin/companies",
  element:<RouteProtect><Companies/></RouteProtect>
},

{
  path:"/admin/companies/create",
  element:<RouteProtect><CompanyCreate/></RouteProtect>
},
{
  path:"/admin/companies/:id",
  element:<RouteProtect><CompanySetUp/></RouteProtect>
},
{
  path:"/admin/jobs",
  element:<RouteProtect><AdminJobs/></RouteProtect>
},
{
  path:"/admin/jobs/create",
  element:<RouteProtect><PostJob/></RouteProtect>
},
{
  path:"/admin/jobs/:id/applicants",
  element:<RouteProtect><Applicants/></RouteProtect>
},


{
  path:"/admin/job/:id/",
  element:<UpdateJob/>
}


])

function App() {
 

  return (
    <>
      <RouterProvider router = {appRouter}/>  
      {/* routing mate uper vadi line lakvi jaruri che , uper je appRouter banayu e che */} 
    </>
  )
}

export default App
