import { useContext, useEffect, useState } from "react";
import { AuthContest } from "../Context";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

const MyBid = () => {
  const [info, setinfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContest);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/userbid/?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setinfo(data);
        console.log(data);
      });
    setLoading(true);
  }, [reload]);
  const handleComplete = (id) => {
    const updateInfo = {
      status: "Complete",
    };
    fetch(`http://localhost:5000/updatebid/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateInfo),
    })
      .then((res) => res.json()) 
      .then((result) => {
        console.log(result);
        toast.success("Project Completed Successfully");
        setReload(!reload);
      });
  };
  if (!loading)
    return <span className="loading loading-dots loading-lg"></span>;
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table border rounded-lg">
          {/* head */}
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Email</th>
              <th>Deadline</th>
              <th>Staus</th>
              <th>Complete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 2 */}
            {info.map((item) => {
              return (
                <tr className="hover" key={item._id}>
                  <td>{item.jobTitle}</td>
                  <td>{item.buyerEmail}</td>
                  <td>{item.deadline}</td>
                  <td>{item.status}</td>
                  <td>
                    {item.status!='Complete' && (
                      <button
                        disabled={
                          item.status != "In progress" ? "disabled" : ""
                        }
                        className="btn bg-[#ff715b] text-[#FFF]"
                        onClick={() => handleComplete(item._id)}
                      >
                        Complete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Helmet>
        <title>SkillHub | My Bid</title>
      </Helmet>
    </div>
  );
};

export default MyBid;
