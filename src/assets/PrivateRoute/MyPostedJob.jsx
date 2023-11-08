import { useContext, useEffect, useState } from "react";
import { AuthContest } from "../Context";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import axios from "axios";
const MyPostedJob = () => {
  const { user } = useContext(AuthContest);
  const [jobs, setJobs] = useState(null);
  useEffect(() => {
    console.log("Hello Whats wrong");
    axios
      .post(
        `https://skillhub-server.vercel.app/userjob?email=${user.email}`,
        user,
        {
          withCredentials: true,
        }
      )
      .then((res) => setJobs(res.data))
      .catch((error) => console.log(error));
  }, [user]);
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://skillhub-server.vercel.app/jobDelete/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data?.deletedCount >= 1) {
              const newData = jobs.filter((item) => item._id != _id);
              setJobs(newData);
              Swal.fire("Deleted!", "Your Job has been removed.", "success");
            }
          });
      }
    });
  };
  if (!jobs) {
    return (
      <div className="flex h-screen justify-center items-center">
        <span className="loading loading-bars loading-md"></span>
        <span className=" text-7xl loading loading-bars loading-lg "></span>
      </div>
    );
  }
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 rounded-lg">
      {jobs.map((job, index) => (
        <div key={index} className="bg-[#f6f9fe] p-10 space-y-2">
          <h3 className="text-3xl lg:text-5xl font-bold text-center ">
            {job.jobTitle}
          </h3>
          <p className="block text-sm">Job Description</p>
          <p className="text-xl">{job.shortDescription}</p>
          <p className="">
            <strong>Deadline:</strong> {job.deadline}
          </p>
          <p>
            <strong>Price Range:</strong> {job.priceRange}
          </p>

          <p>
            <strong>Email:</strong> {job.email}
          </p>
          <div className="flex justify-evenly pt-5">
            <button className="btn bg-[#7ec6d5] text-[#FFF]">
              <Link to={`/updatejob/${job._id}`}>Update</Link>
            </button>
            <button
              className="btn bg-[#ff715b] text-[#FFF]"
              onClick={() => handleDelete(job._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <Helmet>
        <title>SkillHub | My Posted Job</title>
      </Helmet>
    </div>
  );
};

export default MyPostedJob;
