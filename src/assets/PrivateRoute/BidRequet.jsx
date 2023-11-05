import { useContext, useEffect, useState } from "react";
import { AuthContest } from "../Context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BidRequet = () => {
  const [info, setinfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const { user } = useContext(AuthContest);
  useEffect(() => {
    fetch(`http://localhost:5000/userbidrequest/?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setinfo(data);
        console.log(data);
      });
    setLoading(true);
    console.log("Hehjkadfjkanfkjna");
  }, [reload]);
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
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Email</th>
              <th>Deadline</th>
              <th>Staus</th>
              <th>Decision</th>
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
                  <td className="flex">
                    <button
                      className="mx-2"
                      onClick={() => handleDecision(item._id, true)}
                    >
                      Accept
                    </button>
                    <button onClick={() => handleDecision(item._id, false)}>
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BidRequet;
