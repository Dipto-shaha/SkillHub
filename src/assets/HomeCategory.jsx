import {  useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SingleJob from './SingleJob';
const HomeCategory = () => {
    const [loading,setLoading]=useState(false);
    const [web,setWeb]=useState(null);
    const [digital,setDigital]=useState(null);
    const [graphics,setGrapics]=useState(null);
    useEffect(()=>{
      fetch('http://localhost:5000/job')
      .then(res => res.json())
      .then(data=> {
        let newData=data.filter((job) => job.category == "Web Development");
        setWeb(newData);
        newData=data.filter((job) => job.category == "Digital Marketing");
        setDigital(newData);
        newData=data.filter((job) => job.category == "Graphics Design");
        setGrapics(newData);
        setLoading(true);
      }

        );
    },[]);
    if(!loading)
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
        web.map(job => {
          return <SingleJob key={job._id} job={job}></SingleJob>
      })
      }
      </div>
      </TabPanel>
      <TabPanel>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-20'>
      {
        digital.map(job => {return <SingleJob key={job._id} job={job}></SingleJob>})
      }
      </div>
      </TabPanel>
      <TabPanel>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-20'>
        {
          graphics.map(job => {return <SingleJob key={job._id} job={job}></SingleJob>})
        }
      </div>
      </TabPanel>
    </Tabs>
     </>
    );
};

export default HomeCategory;