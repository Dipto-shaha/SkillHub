import { useContext, useEffect, useState } from "react";
import { AuthContest } from "../Context";

const MyPostedJob = () => {
    const {user}=useContext(AuthContest);
    const [jobs,setJobs]=useState(null);
    useEffect(()=>{
        fetch(`http://localhost:5000/userjob?email=${user.email}`)
        .then(res => res.json())
        .then(res => setJobs(res))
    },[])
    if(!jobs){
        return <div className="flex h-screen justify-center items-center"><span className="loading loading-bars loading-md"></span>
        <span className=" text-7xl loading loading-bars loading-lg "></span></div>;
    }
    return (
        <div className="grid grid-cols-2">
            {
                jobs.map((job, index) => (
                    <div key={index}>
                      <h3>{job.jobTitle}</h3>
                      <p><strong>Deadline:</strong> {job.deadline}</p>
                      <p><strong>Price Range:</strong> {job.priceRange}</p>
                      <p><strong>Description:</strong> {job.shortDescription}</p>
                      <p><strong>Email:</strong> {job.email}</p>
                      <button to='/updatejob/:job._id'>Update</button>
                      <button>Delete</button>
                    </div>))
            }
        </div>
    );
};

export default MyPostedJob;