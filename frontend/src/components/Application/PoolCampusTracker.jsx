import  { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Context } from '../../main';
import DriveCard from './DriveCard';

const PoolCampusTracker = () => {
  const { isAuthorized, user } = useContext(Context);
  const [poolCampusDrives, setPoolCampusDrives] = useState([]);
  const [filteredDrives, setFilteredDrives] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDrive, setSelectedDrive] = useState(null);

  useEffect(() => {
    const fetchPoolCampusDrives = async () => {
      try {
        const response = await axios.get('https://jobseek-navy.vercel.app/api/v1/poolcampus/drives', {
          withCredentials: true,
        });
        setPoolCampusDrives(response.data.poolCampusDrives);
      } catch (error) {
        toast.error('Failed to fetch pool campus drives');
      }
    };

    if (isAuthorized) {
      fetchPoolCampusDrives();
    }
  }, [isAuthorized]);

  useEffect(() => {
    // Filter drives based on selected location
    if (selectedLocation) {
      const filtered = poolCampusDrives.filter(drive =>
        drive.collegeLocation.toLowerCase().includes(selectedLocation.toLowerCase())
      );
      setFilteredDrives(filtered);
    } else {
      setFilteredDrives(poolCampusDrives);
    }
  }, [selectedLocation, poolCampusDrives]);

  const handleLocationFilter = location => {
    setSelectedLocation(location);
  };

  const handleDriveDetails = drive => {
    setSelectedDrive(drive);
  };

  return (
    <div className="pool-campus-tracker">
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>POOL CAMPUS DRIVES</h2>
      <div className="location-filter">
        <label htmlFor="location">Filter by Location:</label>
        <select
          id="location"
          value={selectedLocation}
          onChange={e => handleLocationFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="Coimbatore">Coimbatore</option>
          <option value="Chennai">Chennai</option>
        </select>
      </div>
      <div className="drive-list" style={{ marginTop: '20px' }}>
        {filteredDrives.map(drive => (
          <DriveCard key={drive._id} drive={drive} onDriveDetails={handleDriveDetails} />
        ))}
      </div>
      {selectedDrive && (
        <div className="drive-details" style={{ marginTop: '20px' }}>
          <h3>Drive Details</h3>
          <p>
            <strong>Company Name:</strong> {selectedDrive.companyName}
          </p>
          <p>
            <strong>Job Role:</strong> {selectedDrive.jobRole}
          </p>
          <p>
            <strong>Company Location:</strong> {selectedDrive.companyLocation}
          </p>
          <p>
            <strong>Conducting College Name:</strong> {selectedDrive.collegeName}
          </p>
          <p>
            <strong>Date of Drive:</strong> {selectedDrive.dateOfDrive}
          </p>
          <p>
            <strong>Application Link:</strong>{' '}
            <a href={selectedDrive.applicationLink} target="_blank" rel="noopener noreferrer">
              {selectedDrive.applicationLink}
            </a>
          </p>
          <p>
            <strong>College Location:</strong> {selectedDrive.collegeLocation}
          </p>
        </div>
      )}
    </div>
  );
};

export default PoolCampusTracker