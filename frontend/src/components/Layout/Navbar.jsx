import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { GiHamburgerMenu } from 'react-icons/gi';
import ProfileDrawer from './ProfileDrawer';
import { Context } from '../../main';



const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const handleLogout = async () => {
    try {
      const response = await axios.get('https://jobseek-navy.vercel.app/api/v1/user/logout', {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      setShowProfile(false); // Hide profile drawer on logout
    }
    
     catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? 'navbarShow' : 'navbarHide'}>
      <div className="container">
        <div className="logo">
          <img src="/JobZee-logos__white.png" alt="logo" />
        </div>
        <ul className="menu">
          <li>
            <Link to={'/'}>HOME</Link>
          </li>
          <li>
            <Link to={'/job/getall'}>ALL JOBS</Link>
          </li>
          <li>
          <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === 'Job Seeker' && (
            <li>
              <Link to={'/pool-campus-tracker'}>POOL CAMPUS TRACKER</Link>
            </li>
          )}
          {user && user.role === 'Employer' && (
            <>
              <li>
                <Link to={'/job/post'}>POST NEW JOB</Link>
              </li>
              <li>
                <Link to={'/job/me'}>VIEW YOUR JOBS</Link>
              </li>
              {/* Add the "Post Campus Drive" link */}
              <li>
                <Link to={'/campus-drive/post'}>CAMPUS DRIVE</Link>
              </li>
            </>
          )}
          {/* Profile link */}
          <li>
            <Link to="#" className="profile-link" onClick={() => setShowProfile(!showProfile)}>
              PROFILE
            </Link>
          </li>
          {/* Logout button */}
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              LOGOUT
            </button>
          </li>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu />
        </div>
        {/* Render ProfileDrawer if user is authorized and showProfile is true */}
        {isAuthorized && showProfile && (
          <ProfileDrawer user={user} handleLogout={handleLogout} onClose={() => setShowProfile(false)} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
