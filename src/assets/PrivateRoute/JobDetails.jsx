import { useContext, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { AuthContest } from "../Context";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
const JobDetails = () => {
    const {_id,jobTitle,deadline,priceRange,shortDescription,email}=useLoaderData();
    const {user}=useContext(AuthContest);
    const [startDate, setStartDate] = useState(new Date());  
    const today = new Date();
    const navigate = useNavigate();

    today.setHours(0, 0, 0, 0); 
    const handleBid =(e)=>{
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        console.log(form);
        const price = form.get("price");
        const deadline = startDate.toISOString().slice(0, 10);

        const offer = {jobid:_id, buyerEmail:email,userEmail:user.email,price,deadline,jobTitle,
            status : "Pending"
         };
        console.log(offer);
        fetch("http://localhost:5000/bidjob",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(offer),
          }
        )
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            toast.success("Job Bid Successfully"); 
            navigate('/mybid')
          });
    };
    return (
        <>
            <div >
              <h3>{jobTitle}</h3>
              <p><strong>Deadline:</strong> {deadline}</p>
              <p><strong>Price Range:</strong> {priceRange}</p>
              <p><strong>Description:</strong> {shortDescription}</p>
              <p><strong>Email:</strong> {email}</p>
            </div>
            <div className="gird grid-cols-1 lg:grid-cols-2 ">
                <form onSubmit={handleBid}>
                    <div>
                        <label>Buyer Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                        />
                    </div>
                    <div>
                        <label>Your Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                        />
                    </div>
                    <div>
                    <label>Your Proposed Deadline </label>
                    <DatePicker selected={startDate} minDate={today} onChange={(date) => setStartDate(date)} />
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
                    <button disabled={ user.email == email ? 'disabled' : ''}>Bid Now</button>
                </form>
            </div>
        </>
    );
};

export default JobDetails;