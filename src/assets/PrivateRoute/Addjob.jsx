import { useContext,useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContest } from "../Context";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const Addjob = () => {
    const {user}=useContext(AuthContest);
    const [startDate, setStartDate] = useState(new Date());
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    console.log(user);
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

        const job = { email,jobTitle: title,category: Category, mx_price, mn_price,shortDescription: description,deadline };
        console.log(job);
        fetch("http://localhost:5000/addjob",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(job),
          }
        )
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            toast.success("Product Added Successfully");
          });
      };
    return (
      <div className="bg-[#5154745F] lg:mx-20 mx-10 py-10 my-10 lg:px-20 px-10 rounded-lg">
        <p className="text-center text-3xl font-bold mb-10">
          Add a New Job
        </p>
        <form onSubmit={handleAddJob}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
              />
            </div>
            <div>
              <label>Job Title</label>
              <input
                type="text"
                name="title"
                placeholder="Add your job titel"
              />
            </div>
            <div className="mt-5 flex  items-center">
              <p>Category Name</p>
              <select className="ml-5 rounded-lg" name="Category" required>
                <option value="" disabled selected>
                  Select a Category
                </option>
                <option value="Web Development">Web Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Graphics Design"> Graphics Design</option>
              </select>
            </div>
            <div>
              <label>Deadline </label>
              <DatePicker selected={startDate} minDate={today} onChange={(date) => setStartDate(date)} />
            </div>
            <div>
              <label>Maximum Price</label>
              <input
                name="mx_price"
                type="text"
                placeholder="Job Minimum Price"
                required
              />
            </div>
            <div>
              <label>Minimum  Price</label>
              <input
                name="mn_price"
                type="text"
                placeholder="Job Minimum Price"
                required
              />
            </div>
           
          </div>

          <div className="w-full">
            <label>Job description</label>
            <textarea
              placeholder="Write Job description"
              name="description"
              className="textarea textarea-bordered textarea-md w-full max-w-xs"
            ></textarea>
          </div>
          <div className="text-center">
            <button className="px-10 py-2 font-bold text-[#FFF] bg-[#2b3440] rounded-xl">
              Add Job
            </button>
          </div>
        </form>
      </div>
    );
};

export default Addjob;