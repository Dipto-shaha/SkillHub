import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./formDesign.css";

const Updatejob = () => {
    const {_id,email,jobTitle,category, mx_price, mn_price,shortDescription,deadline}=useLoaderData(); 
    console.log(category,typeof(deadline));
    const dateObject = new Date(deadline);

    const [startDate, setStartDate] = useState(dateObject);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const handleAddJob = (e) => { 
        e.preventDefault();
        console.log("Hello");
        const form = new FormData(e.currentTarget);
        console.log(form);
        const email = form.get("email");
        const title = form.get("title");
        const Category = form.get("Category");
        const mx_price = form.get("mx_price");
        const mn_price = form.get("mn_price");
        const description = form.get("description");
        const deadline = startDate.toISOString().slice(0, 10);

        const job = { email,jobTitle: title,category: Category, priceRange:`$${mn_price} - $${mx_price}`,shortDescription: description,deadline };
        console.log(job);
        fetch(`http://localhost:5000/updatejob/${_id}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(job),
          }
        )
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            toast.success("Job Updated Successfully");
          });
      };
    return (
        <div className="bg-[#f6f9fe] lg:mx-20 mx-10 py-10 my-10 lg:px-20 px-10 rounded-lg">
        <p className="text-center text-3xl font-bold mb-10">
          Update a Job
        </p>
        <form onSubmit={handleAddJob}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 designforForm ">
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                defaultValue={email}
              />
            </div>
            <div>
              <label>Job Title</label>
              <input
                type="text"
                name="title"
                defaultValue={jobTitle}
                placeholder="Add your job titel"
              />
            </div>
            <div>
              <label>Maximum Price</label>
              <input
                name="mx_price"
                type="text"
                placeholder="Job Minimum Price"
                defaultValue={mx_price}
                required
              />
            </div>
            <div>
              <label>Minimum  Price</label>
              <input
                name="mn_price"
                type="text"
                placeholder="Job Minimum Price"
                defaultValue={mn_price}
                required
              />
            </div>
            <div className="  items-center">
              <p className="font-semibold block text-lg"> Category Name</p>
              <select className="rounded-lg" name="Category" required>
                <option defaultValue={category}  selected>{category}</option>
                { (category!="Web Development") &&  <option value="Web Development">Web Development</option>}
                { (category!="Digital Marketing") &&  <option value="Web Development">Digital Marketing</option>}
                { (category!="Graphics Design") &&  <option value="Web Development">Graphics Design</option>}
              </select>
            </div>
            <div>
              <label>Deadline </label>
              <DatePicker selected={startDate} minDate={today} onChange={(date) => setStartDate(date)} />
            </div>
            
           
          </div>

          <div className="w-full designforForm my-5">
            <label>Job description</label>
            <textarea
              placeholder="Write Job description"
              name="description"
              defaultValue={shortDescription}
              className=" textarea-md w-full max-w-xs"
            ></textarea>
          </div>
          <div className="text-center">
            <button className="px-10 py-2 font-bold text-[#FFF] bg-[#ff715b] hover:border-2  rounded-xl">
              Update Job
            </button>
          </div>
        </form>
        <Helmet>
                <title>SkillHub | UpdateJob</title>
        </Helmet>
      </div>
    );
};

export default Updatejob;

