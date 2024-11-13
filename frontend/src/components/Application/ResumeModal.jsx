import PropTypes from 'prop-types';

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="resume-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="resume" />
      </div>
    </div>
  );
};

ResumeModal.propTypes = {
  imageUrl: PropTypes.string.isRequired, // imageUrl prop is required and must be a string
  onClose: PropTypes.func.isRequired, // onClose prop is required and must be a function
};

export default ResumeModal;

