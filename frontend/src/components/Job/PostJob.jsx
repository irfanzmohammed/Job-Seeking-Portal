import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostJob = () => {
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [ampm, setAmPm] = useState("AM");
  const [requiredSkillsInput, setRequiredSkillsInput] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");

  const categories = [
    "Graphics & Design",
    "Mobile App Development",
    "Frontend Web Development",
    "MERN Stack Development",
    "Account & Finance",
    "Artificial Intelligence",
    "Video Animation",
    "MEAN Stack Development",
    "MEVN Stack Development",
    "Data Entry Operator",
  ];

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo, user]);

  const handleJobPost = async (e) => {
    e.preventDefault();

    try {
      const jobData = {
        
        title,
        description,
        category,
        country,
        city,
        location,
        interviewDate,
        interviewTime: `${interviewTime} ${ampm}`,
        requiredSkills,
      };

      const response = await axios.post(
        "https://jobseek-navy.vercel.app/api/v1/job/post",
        jobData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to post job. Please try again later.");
      }
    }
  };

  return (
    <div className="job_post page">
      <div className="container">
        <h3>POST NEW JOB</h3>
        <form onSubmit={handleJobPost}>
         
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
            required // Add this if job title is required
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
          <input
            type="text"
            value={requiredSkillsInput}
            onChange={(e) => {
              setRequiredSkillsInput(e.target.value);
              setRequiredSkills(e.target.value.split(","));
            }}
            placeholder="Required Skills (comma-separated)"
          />
          <input
            type="date"
            value={interviewDate}
            onChange={(e) => setInterviewDate(e.target.value)}
            placeholder="Interview Date"
          />
          <input
            type="time"
            value={interviewTime}
            onChange={(e) => setInterviewTime(e.target.value)}
            placeholder="Interview Time"
          />
          <select value={ampm} onChange={(e) => setAmPm(e.target.value)}>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
          <textarea
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job Description"
          />
          <button type="submit">Create Job</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
