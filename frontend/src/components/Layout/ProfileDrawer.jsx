import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from 'react-avatar';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBTypography, MDBInput } from 'mdb-react-ui-kit';
import { Context } from '../../main';
import toast from 'react-hot-toast';

const ProfileDrawer = ({ user, onClose }) => {
  const { setIsAuthorized } = useContext(Context);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    // Fetch user skills when the component mounts
    fetchUserSkills();
  }, []); 

  const fetchUserSkills = async () => {
    try {
      const response = await axios.get('https://jobseek-navy.vercel.app/api/v1/user/skills', {
        withCredentials: true,
      });
      setSkills(response.data.skills);
    } catch (error) {
      toast.error('Failed to fetch user skills');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get('https://jobseek-navy.vercel.app/api/v1/user/logout', {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      onClose();
    } catch (error) {
      toast.error('Failed to logout');
      setIsAuthorized(true);
    }
  };

  const handleAddSkill = async () => {
    if (newSkill.trim() === '') {
      toast.error('Please enter a valid skill');
      return;
    }

    // Split the input string by commas and remove leading/trailing spaces
    const newSkills = newSkill.split(',').map((skill) => skill.trim());

    try {
      // Add each skill to the user's skills list using POST request
      for (const skill of newSkills) {
        const response = await axios.post(
          'https://jobseek-navy.vercel.app/api/v1/user/skills/add',
          { skill },
          { withCredentials: true }
        );
        toast.success(response.data.message);
        // Update skills list with the new skill
        setSkills((prevSkills) => [...prevSkills, skill]);
      }

      setNewSkill(''); // Clear the input field after adding the skills
    } catch (error) {
      toast.error('Failed to add skill');
    }
  };

  return (
    <section className="profile-drawer">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <div className="profile-header">
                <Avatar
                  name={user?.name}
                  size="60"
                  round
                  className="profile-avatar"
                  style={{ marginRight: '20px' }}
                />
                <div className="profile-details">
                  <MDBTypography tag="h5">{user?.name}</MDBTypography>
                  <MDBCardText>{user?.email}</MDBCardText>
                </div>
              </div>

              {user?.role !== 'Employer' && (
                <div className="profile-skills">
                  <h6>Skills:</h6>
                  <ul>
                    {skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}

              {user?.role !== 'Employer' && (
                <>
                  <MDBInput
                    type="text"
                    label="Add New Skill (comma-separated)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <button onClick={handleAddSkill}> Add Skill</button>
                 
                 
                </>
              )}

              <div className="logout-btn-container">
                <button className="logout-btn" onClick={handleLogout}>
                  LOGOUT
                </button>
              </div>

              <button className="close-btn" onClick={onClose}>
                Close
              </button>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default ProfileDrawer;