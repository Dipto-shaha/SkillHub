import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

const SingleJob = ({job}) => {
    return (
    <div >
        <h3>{job.jobTitle}</h3>
        <p><strong>Deadline:</strong> {job.deadline}</p>
        <p><strong>Price Range:</strong> {job.priceRange}</p>
        <p><strong>Description:</strong> {job.shortDescription}</p>
        <p><strong>Email:</strong> {job.email}</p>
        <Link to={`/job/${job._id}`}><button>Bid Now</button></Link>
    </div>
    );
};
SingleJob.propTypes = {
    job: PropTypes.object.isRequired
  };
export default SingleJob;