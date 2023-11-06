import { useContext, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { AuthContest } from "../Context";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import "./formDesign.css";

const JobDetails = () => {
  const { _id, jobTitle, deadline, priceRange, shortDescription, email } =
    useLoaderData();
  const { user } = useContext(AuthContest);
  const [startDate, setStartDate] = useState(new Date());
  const today = new Date();
  const navigate = useNavigate();
  const dateObject = new Date(deadline);


  today.setHours(0, 0, 0, 0);
  const handleBid = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    console.log(form);
    const price = form.get("price");
    const deadline = startDate.toISOString().slice(0, 10);

    const offer = {
      jobid: _id,
      buyerEmail: email,
      userEmail: user.email,
      price,
      deadline,
      jobTitle,
      status: "Pending",
    };
    console.log(offer);
    fetch("http://localhost:5000/bidjob", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(offer),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.success("Job Bid Successfully");
        navigate("/mybid");
      });
  };
  return (
    <>
      <div className="bg-[#f6f9fe] p-5 rounded-xl">
      <p className="text-center font-medium text-3xl lg:text-5xl ">Job Details</p>
        <h3 className="mt-5 text-center font-bold text-xl lg:text-3xl">{jobTitle}</h3>
        <p>
          <strong>Deadline:</strong> {deadline}
        </p>
        <p>
          <strong>Price Range:</strong> {priceRange}
        </p>
        <p>
          <strong>Description:</strong> {shortDescription}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>
      <div className="">
      <div className="bg-[#f6f9fe]  mx-auto px-10    py-5 lg:w-1/2 mt-10 rounded-lg border-2">
        <p className="text-center text-5xl font-semibold">Your Offer</p>
        <div className="mt-10">
          <form onSubmit={handleBid} className="designforForm">
            <div>
              <label>Buyer Email</label>
              <input type="email" name="email" value={email} />
            </div>
            <div>
              <label>Your Email</label>
              <input type="email" name="email" value={user.email} />
            </div>
            <div>
              <label>Offer Price</label>
              <input
                name="price"
                type="text"
                placeholder="Job Price"
                required
              />
            </div>
            <div>
              <label>Your Proposed Deadline </label>
              <DatePicker
                selected={startDate}
                minDate={today}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="flex items-center">
              <button disabled={ ( dateObject < today || user.email == email )? "disabled" : ""} className=" mx-auto mt-5 btn bg-[#ff715b] text-[#FFF]">
                Bid Now
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
      <Helmet>
        <title>SkillHub | Job Details</title>
      </Helmet>
    </>
  );
};

export default JobDetails;
