import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "https://jobseek-navy.vercel.app/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`https://jobseek-navy.vercel.app/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`https://jobseek-navy.vercel.app/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div className="myJobs page">
      <div className="container">
        <h1>Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <div className="banner">
            {myJobs.map((job) => (
              <div className="card" key={job._id}>
                <div className="content">
                  <div className="short_fields">
                    <div>
                      <span>Title:</span>
                      <input
                        type="text"
                        disabled={editingMode !== job._id}
                        value={job.title}
                        onChange={(e) =>
                          handleInputChange(job._id, "title", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <span>Country:</span>
                      <input
                        type="text"
                        disabled={editingMode !== job._id}
                        value={job.country}
                        onChange={(e) =>
                          handleInputChange(job._id, "country", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <span>City:</span>
                      <input
                        type="text"
                        disabled={editingMode !== job._id}
                        value={job.city}
                        onChange={(e) =>
                          handleInputChange(job._id, "city", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <span>Category:</span>
                      <select
                        value={job.category}
                        onChange={(e) =>
                          handleInputChange(job._id, "category", e.target.value)
                        }
                        disabled={editingMode !== job._id}
                      >
                        <option value="">Select Category</option>
                        <option value="Graphics & Design">Graphics & Design</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="Frontend Web Development">Frontend Web Development</option>
                        <option value="MERN Stack Development">MERN STACK Development</option>
                        <option value="Account & Finance">Account & Finance</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Video Animation">Video Animation</option>
                        <option value="MEAN Stack Development">MEAN STACK Development</option>
                        <option value="MEVN Stack Development">MEVN STACK Development</option>
                        <option value="Data Entry Operator">Data Entry Operator</option>
                      </select>
                    </div>
                    {/* <div>
                      <span>Expired:</span>
                      <select
                        value={job.expired}
                        onChange={(e) =>
                          handleInputChange(job._id, "expired", e.target.value)
                        }
                        disabled={editingMode !== job._id}
                      >
                        <option value={true}>TRUE</option>
                        <option value={false}>FALSE</option>
                      </select>
                    </div> */}
                    <div>
                      <span>Interview Date:</span>
                      <input
                        type="date"
                        value={job.interviewDate}
                        onChange={(e) =>
                          handleInputChange(job._id, "interviewDate", e.target.value)
                        }
                        disabled={editingMode !== job._id}
                      />
                    </div>
                    <div>
                      <span>Interview Time:</span>
                      {editingMode === job._id ? (
                        <>
                          <input
                            type="time"
                            value={job.interviewTime}
                            onChange={(e) =>
                              handleInputChange(job._id, "interviewTime", e.target.value)
                            }
                            step={300} // Use 5-minute intervals
                          />
                          {/* Custom AM/PM selector */}
                          <select
                            value={job.interviewTime.slice(-2)} // Get AM/PM part
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "interviewTime",
                                job.interviewTime.slice(0, -2) + e.target.value
                              )
                            }
                          >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                          </select>
                        </>
                      ) : (
                        <span>{job.interviewTime}</span>
                      )}
                    </div>
                    <div>
                      <span>Required Skills:</span>
                      <input
                        type="text"
                        disabled={editingMode !== job._id}
                        value={job.requiredSkills.join(", ")}
                        onChange={(e) =>
                          handleInputChange(job._id, "requiredSkills", e.target.value.split(", "))
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="button_wrapper">
                  {editingMode === job._id ? (
                    <>
                      <button
                        onClick={() => handleUpdateJob(job._id)}
                        className="check_btn"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleDisableEdit()}
                        className="cross_btn"
                      >
                        <RiCloseLine />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEnableEdit(job._id)}
                      className="edit_btn"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="delete_btn"
                  >
                    MAKE EXPIRE
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You have not posted any jobs or may have deleted all your jobs.</p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
