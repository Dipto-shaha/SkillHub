import { useContext, useEffect, useState } from "react";
import { AuthContest } from "../Context";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
const MyPostedJob = () => {
  const { user } = useContext(AuthContest);
  const [jobs, setJobs] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5000/userjob?email=${user.email}`)
      .then((res) => res.json())
      .then((res) => setJobs(res));
  }, []);
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
        fetch(`http://localhost:5000/jobDelete/${_id}`, {
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
    <div className="grid grid-cols-2">
      {jobs.map((job, index) => (
        <div key={index}>
          <h3>{job.jobTitle}</h3>
          <p>
            <strong>Deadline:</strong> {job.deadline}
          </p>
          <p>
            <strong>Price Range:</strong> {job.priceRange}
          </p>
          <p>
            <strong>Description:</strong> {job.shortDescription}
          </p>
          <p>
            <strong>Email:</strong> {job.email}
          </p>
          <Link to={`/updatejob/${job._id}`}>Update</Link>
          <button onClick={() => handleDelete(job._id)}>Delete</button>
        </div>
      ))}
      <Helmet>
        <title>SkillHub | My Posted Job</title>
      </Helmet>
    </div>
  );
};

export default MyPostedJob;
