import  { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("https://jobseek-navy.vercel.app/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            console.log("Employer applications:", res.data.applications);
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("https://jobseek-navy.vercel.app/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            console.log("Job Seeker applications:", res.data.applications);
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error(error.response.data.message);
    }
  }, [isAuthorized, user]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // const getMyApplicationsCount = () => {
  //   const myApplications = applications.filter((app) => {
  //     console.log("applicantId:", app.applicantId, "user._id:", user?._id);
  //     return app.applicantId === user?._id;
  //   });
  //   console.log("My applications:", myApplications);
  //   return myApplications.length;
  // };

  const getApplicantApplicationsCount = () => {
    const applicantApplications = applications.filter((app) => app.applicantId !== user?._id);
    console.log("Applicant applications:", applicantApplications);
    return applicantApplications.length;
  };

  // const myApplicationsCount = getMyApplicationsCount();
  const applicantApplicationsCount = getApplicantApplicationsCount();
  
  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications </h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Job Seekers ({applicantApplicationsCount})</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          
          
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        {/* <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div> */}
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          
          
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </>
  );
};