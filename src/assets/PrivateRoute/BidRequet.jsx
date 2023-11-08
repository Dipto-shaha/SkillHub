import { useContext, useEffect, useState } from "react";
import { AuthContest } from "../Context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
const BidRequet = () => {
  const [info, setinfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const { user } = useContext(AuthContest);
  useEffect(() => {
    fetch(`http://localhost:5000/userbidrequest/?email=${user.email}`,{ credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setinfo(data);
        console.log(data);
      });
    setLoading(true);
  }, [reload, user.email]);
  const handleDecision = (_id, operation) => {
    let updateInfo;
    if (operation) {
      updateInfo = {
        status: "In progress",
      };
    } else {
      updateInfo = {
        status: "Rejected",
      };
    }
    fetch(`http://localhost:5000/updatebid/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updateInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.success("Bid Staus Updated Successfully");
        setReload(!reload);
      });
  };
  if (!loading)
    return <span className="loading loading-dots loading-lg"></span>;
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table border border-[#7ec6d5] rounded-xl">
          {/* head */}
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Email</th>
              <th>Deadline</th>
              <th>Staus</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {/* row 2 */}
            {info.map((item) => {
              return (
                <tr className="hover" key={item._id}>
                  <td>{item.jobTitle}</td>
                  <td>{item.userEmail}</td>
                  <td>{item.deadline}</td>
                  <td>{item.status}</td>
                  {item.status != "Rejected" ? (
                    item.status == "Pending" ? (
                      <td className="flex">
                        <button
                          className="mx-2 btn bg-[#42f042] text-[#FFF]"
                          onClick={() => handleDecision(item._id, true)}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDecision(item._id, false)}
                          className=" btn bg-[#ff715b] text-[#FFF]"
                        >
                          Reject
                        </button>
                      </td>
                    ) : item.status == "In progress" ? (
                      <p className="pt-3 pr-2">
                        <ProgressBar
                          percent={60}
                          filledBackground="linear-gradient(to right, #fefb72, #ff715b)"
                        />
                      </p>
                    ) : (
                      <p className="pt-3 pr-2">
                        <ProgressBar
                          percent={100}
                          filledBackground="linear-gradient(to right, #fefb72, #ff715b)"
                        />
                      </p>
                    )
                  ) : (
                    ""
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Helmet>
        <title>SkillHub | Bid Request</title>
      </Helmet>
    </div>
  );
};

export default BidRequet;
