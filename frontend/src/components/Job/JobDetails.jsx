import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { format } from "date-fns";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/job/${id}`, {
          withCredentials: true,
        });
        setJob(response.data.job);
      } catch (error) {
        console.error("Error fetching job details:", error);
        navigateTo("/notfound");
      }
    };

    fetchJobDetails();
  }, [id, navigateTo]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  const formattedDate = job.interviewDate ? format(new Date(job.interviewDate), "MMMM d, yyyy") : "Not scheduled";

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>
            Title: <span>{job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Country: <span>{job.country}</span>
          </p>
          <p>
            City: <span>{job.city}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Description: <span>{job.description}</span>
          </p>
          <p>
            Job Posted On: <span>{job.jobPostedOn}</span>
          </p>
          <p>
            Interview Date: <span>{formattedDate}</span>
          </p>
          <p>
            Interview Time: <span>{job.interviewTime}</span>
          </p>
          {user && user.role === "Employer" && (
            <div>
              <h4>Required Skills</h4>
              <p>
                {job.requiredSkills ? job.requiredSkills.join(", ") : "No required skills specified"}
              </p>
            </div>
          )}
          {user && user.role !== "Employer" && (
            <Link to={`/application/${job._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
