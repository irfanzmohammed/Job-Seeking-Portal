import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../main';

const Jobs = () => {
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      if (!isAuthorized) {
        navigateTo('/');
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/api/v1/job/getall', {
          withCredentials: true,
        });

        console.log('Fetched jobs response:', response.data.jobs);
        console.log(response.data && Array.isArray(response.data.jobs));

        if (response.data && Array.isArray(response.data.jobs)) {
          const jobsArray = response.data.jobs;

          console.log("jobs array",jobsArray);

          let filteredJobs = jobsArray;

          console.log("filtered",filteredJobs);

          console.log(user.role === 'Job Seeker');

          if (user.role === 'Job Seeker') {
            filteredJobs = filteredJobs.filter((job) => {
              const requiredSkillsArray = job.requiredSkills.map((skill) => skill.trim().toLowerCase());
              const userSkillsArray = user.skills.map((skill) => skill.trim().toLowerCase());

              console.log(requiredSkillsArray);
              console.log(userSkillsArray);

              console.log(userSkillsArray.some((requiredSkill) => requiredSkillsArray.includes(requiredSkill)));

              return requiredSkillsArray.some((requiredSkill) => userSkillsArray.includes(requiredSkill));
            });
          } else if (user.role === 'Employer' && selectedCategory) {
            filteredJobs = filteredJobs.filter((job) => job.category === selectedCategory);
          }

          console.log('Filtered jobs:', filteredJobs);

          setJobs(filteredJobs);
        } else{
          console.error('Failed to fetch jobs: Invalid response data format');
          setJobs([]);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        setJobs([]);
      }
    };

    fetchJobs();
  }, [isAuthorized, navigateTo, selectedCategory, user.role, user.skills]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const renderJobCards = () => {
    if (jobs.length === 0) {
      return <p>No jobs available.</p>;
    }

    return jobs.map((job) => (
      <div className="card" key={job._id}>
        <p>{job.title}</p>
        <p>{job.category}</p>
        <p>{job.country}</p>
        <Link to={`/job/${job._id}`}>Job Details</Link>
      </div>
    ));
  };

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>

        {user.role === 'Employer' && (
          <div className="category-dropdown-container">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="category-dropdown"
            >
              <option value="">All Categories</option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Frontend Web Development">Frontend Web Development</option>
              <option value="MERN STACK Development">MERN STACK Development</option>
              <option value="Account & Finance">Account & Finance</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Video Animation">Video Animation</option>
              <option value="Game Development">Game Development</option>
            </select>
          </div>
        )}

        <div className="banner">
          {renderJobCards()}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
