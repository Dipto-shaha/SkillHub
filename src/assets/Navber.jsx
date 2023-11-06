import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContest } from "./Context";




const Navber = () => {
  const {user,logOut} =useContext(AuthContest); 
    const handleLogout =()=>{
        logOut()
        .then(res => {console.log(res);
            toast.success("Log Out Successfully");
    })
    .catch(error => {console.log(error);})
    }
  return (
    <>
    <div className={` navbar  bg-[#7ec6d533]`}>
      <div className="navbar-start flex">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow font-extrabold	 bg-[#f0f0ff] rounded-box w-52"
          >
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/addjob'>Add job</NavLink>
            </li>
            <li>
              <NavLink to='/myjob'> My posted jobs</NavLink>
            </li>
            <li>
              <NavLink to='/mybid'>My Bids</NavLink>
            </li>
            <li>
              <NavLink to='/myreq'>Bid Requests</NavLink>
            </li>
          </ul>
        </div>
        <img className="w-12 h-8 lg:w-20 lg:h-20 rounded-3xl"src='https://i.ibb.co/WpgYsv0/logo.jpg'></img>
        <p className="mx-2 text-4xl font-bold">
            Skill<span className="text-[#ff715b]">Hub</span>
          </p>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/addjob'>Add job</NavLink>
            </li>
            <li>
              <NavLink to='/myjob'> My posted jobs</NavLink>
            </li>
            <li>
              <NavLink to='/mybid'>My Bids</NavLink>
            </li>
            <li>
              <NavLink to='/myreq'>Bid Requests</NavLink>
            </li>
        </ul>
      </div>
      <div className="navbar-end">
        {
          user ? 
          <div className="flex justify-center items-center ">
              <span className="flex justify-center items-center border-2 p-1 rounded-xl mr-2  border-[#7ec6d5] "  >
              <img className=" rounded-full border-1 h-12 w-14  mx-2 "src={user.photoURL} alt="Image" />
              <p className="mr-2">{user.displayName ? user.displayName:"Name" }</p>
              </span> 
              <Link className="px-2 py-2 rounded-lg text-[#FFF] bg-[#515474] border-2" onClick={handleLogout} to={'/'}>Log Out</Link> 
          </div>:
          
          <Link className={` px-2 py-2 mr-2 rounded-lg bg-[#515474] text-[#FFF]  border-2  `} to={'/login'} >Log In</Link>
          

        }
        </div>
    </div>
    <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
    />
    </>
  );
};

export default Navber;