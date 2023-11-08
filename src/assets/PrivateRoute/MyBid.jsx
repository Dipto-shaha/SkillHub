import { useContext, useEffect, useState } from "react";
import { AuthContest } from "../Context";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { BiSortAZ } from "react-icons/bi";
import { FaRandom } from "react-icons/fa";

const MyBid = () => {
  const [info, setinfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContest);
  const [reload, setReload] = useState(false);
  const [sortOption, setSortOption] = useState(false);
  useEffect(() => {
    let url = "";
    if (sortOption)
      url = `https://skillhub-server.vercel.app/userbid/?email=${user.email}&sort=sorted`;
    else
      url = `https://skillhub-server.vercel.app/userbid/?email=${user.email}`;
    fetch(url, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setinfo(data);
        console.log(data);
      });
    setLoading(true);
  }, [user, reload, sortOption]);

  const handleComplete = (id) => {
    const updateInfo = {
      status: "Complete",
    };
    fetch(`https://skillhub-server.vercel.app/updatebid/${id}`, {
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
        toast.success("Project Completed Successfully");
        setReload(!reload);
      });
  };
  if (!loading)
    return <span className="loading loading-dots loading-lg"></span>;
  return (
    <div>
      <div className="overflow-x-auto mb-20 ">
        <table className="table border border-[#7ec6d5] rounded-xl">
          {/* head */}
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Email</th>
              <th>Deadline</th>
              <th className="flex justify-center items-center">
                Staus
                <button
                  className=" ml-2 text-2xl tooltip tooltip-bottom"
                  data-tip={!sortOption ? "Sort" : "Random"}
                  onClick={() => {
                    setSortOption(!sortOption);
                  }}
                >
                  {!sortOption ? <BiSortAZ></BiSortAZ> : <FaRandom></FaRandom>}
                </button>
              </th>
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
                    {item.status != "Complete" && (
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
