import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
const HomeCategory = () => {
    const [jobs,setJobs]=useState(null);
    useEffect(()=>{
      fetch('http://localhost:5000/job')
      .then(res => res.json())
      .then(data=> {
        console.log(data)
        setJobs(data)}
        );
    },[]);
    if(!jobs)
      return (<><span className="loading loading-dots loading-md"></span>
      <span className="loading loading-dots loading-lg"></span></>)
    return (
     <>
     <div>
        
     </div>
      <Tabs>
      <TabList>
        <Tab>Web Development</Tab>
        <Tab>Digital Marketing</Tab>
        <Tab>Graphics Design</Tab>
      </TabList>
      <TabPanel >
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-20'>
        {
        jobs.filter((job) => job.category === "Web Development")
          .map((job, index) => (
            <div key={index}>
              <h3>{job.jobTitle}</h3>
              <p><strong>Deadline:</strong> {job.deadline}</p>
              <p><strong>Price Range:</strong> {job.priceRange}</p>
              <p><strong>Description:</strong> {job.shortDescription}</p>
              <p><strong>Email:</strong> {job.email}</p>
              <button>Bid Now</button>
            </div>
          ))}
      </div>
      </TabPanel>
      <TabPanel>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-20'>
        {
        jobs.filter((job) => job.category === "Digital Marketing")
          .map((job, index) => (
            <div key={index}>
              <h3>{job.jobTitle}</h3>
              <p><strong>Deadline:</strong> {job.deadline}</p>
              <p><strong>Price Range:</strong> {job.priceRange}</p>
              <p><strong>Description:</strong> {job.shortDescription}</p>
              <p><strong>Email:</strong> {job.email}</p>
              <button>Bid Now</button>
            </div>
          ))}
      </div>
      </TabPanel>
      <TabPanel>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-20'>
        {
        jobs.filter((job) => job.category === "Graphics Design")
          .map((job, index) => (
            <div key={index}>
              <h3>{job.jobTitle}</h3>
              <p><strong>Deadline:</strong> {job.deadline}</p>
              <p><strong>Price Range:</strong> {job.priceRange}</p>
              <p><strong>Description:</strong> {job.shortDescription}</p>
              <p><strong>Email:</strong> {job.email}</p>
              <button >Bid Now</button>
            </div>
          ))}
      </div>
      </TabPanel>
    </Tabs>
     </>
    );
};

export default HomeCategory;