// DriveCard.jsx


const DriveCard = ({ drive, onDriveDetails }) => {
  const handleShowDetails = () => {
    onDriveDetails(drive);
  };

  return (
    <div className="drive-card">
      <h3>{drive.companyName}</h3>
      <p>Conducting College: {drive.collegeName}</p>
      <button onClick={handleShowDetails}>Drive Details</button>
    </div>
  );
};

export default DriveCard;