import  { useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Context } from '../../main';

const PoolCampusDriveForm = () => {
  const { isAuthorized, user } = useContext(Context);
  const [formData, setFormData] = useState({
    companyName: '',
    jobRole: '',
    companyLocation: '',
    collegeName: '',
    dateOfDrive: '',
    applicationLink: '',
    collegeLocation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthorized || (user && user.role !== 'Employer')) {
      toast.error('Unauthorized access');
      return;
    }

    try {
      const response = await axios.post('https://jobseek-navy.vercel.app/api/v1/poolcampus/campusdrive', formData);

      toast.success(response.data.message);

      // Clear form data after successful submission
      setFormData({
        companyName: '',
        jobRole: '',
        companyLocation: '',
        collegeName: '',
        dateOfDrive: '',
        applicationLink: '',
        collegeLocation: '',
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="pool-campus-drive-form">
      <h2>Pool Campus Drive</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobRole">Job Role:</label>
          <input
            type="text"
            id="jobRole"
            name="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyLocation">Company Location:</label>
          <input
            type="text"
            id="companyLocation"
            name="companyLocation"
            value={formData.companyLocation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="collegeName">Conducting College Name:</label>
          <input
            type="text"
            id="collegeName"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfDrive">Date of Drive:</label>
          <input
            type="date"
            id="dateOfDrive"
            name="dateOfDrive"
            value={formData.dateOfDrive}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="applicationLink">Application Link:</label>
          <input
            type="text"
            id="applicationLink"
            name="applicationLink"
            value={formData.applicationLink}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="collegeLocation">College Location:</label>
          <input
            type="text"
            id="collegeLocation"
            name="collegeLocation"
            value={formData.collegeLocation}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="post-drive-button">
          POST DRIVE
        </button>
      </form>
    </div>
  );
};

export default PoolCampusDriveForm;
