import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowActivity.css";
import Sidebar from "../Home/Sidebar";
import { Carousel } from "react-responsive-carousel";
import CustomModal from "./CustomModal";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ShowActivity() {
  const [activities, setActivities] = useState([]);
  const [modalOpen, setModalIsOpen] = useState(false);

  const [selectedActivity, setSelectedActivity] = useState(null);

  const openModal = () => {
    setModalIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const email = localStorage.getItem("email");

    axios
      .get(`http://localhost:8080/db/activities.php`, {
        params: {
          email: email,
        },
      })
      .then((response) => {
        setActivities(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
      });
  }, []);

  const handleDelete = (activityID) => {
    axios
      .delete(`http://localhost:8080/db/activities.php?id=${activityID}`)
      .then((response) => {
        if (response.data.success) {
          setActivities((prevActivities) =>
            prevActivities.filter(
              (activity) => activity.ActivityID !== activityID
            )
          );
          console.log(`Activity with ID ${activityID} deleted successfully.`);
        } else {
          console.error(`Error deleting activity with ID ${activityID}.`);
        }
      })
      .catch((error) => {
        console.error("Error deleting activity:", error);
      });
  };

  return (
    <>
      <Sidebar />
      <div className="container mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date and Time</th>
              <th>Location</th>
              <th>Organizer</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.length ? (
              activities.map((activity) => (
                <tr key={activity.ActivityID}>
                  <td>{activity.Title}</td>
                  <td>{activity.Description}</td>
                  <td>{activity.DateAndTime}</td>
                  <td>{activity.Location}</td>
                  <td>{activity.Organizer}</td>
                  <td>{activity.dept}</td>
                  <td>
                    <div className="space-x-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded text-xs"
                        onClick={() => {
                          let res = window.confirm("Do you want to delete?");
                          if (res) {
                            handleDelete(activity.ActivityID);
                          }
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs"
                        onClick={() => {
                          setSelectedActivity(activity);
                          openModal();
                        }}
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  <h1>No Data found!!</h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={modalOpen} onClose={closeModal}>
        {selectedActivity && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal">
              <div className="bg-white p-4 rounded shadow-lg">
                <Carousel
                  autoPlay
                  infiniteLoop
                  showStatus={true}
                  showIndicators={true}
                  showThumbs={false}
                  interval={5000}
                  onSwipeStart={true}
                >
                  {Array.isArray(selectedActivity.PhotosVideos) ? (
                    selectedActivity.PhotosVideos.map((url, index) => (
                      <div key={index}>
                        <img
                          src={url}
                          alt={`Image ${index + 1}`}
                          style={{
                            maxWidth: "70%",
                            height: "auto",
                            maxHeight: "500px",
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <div>
                      <img
                        src={selectedActivity.PhotosVideos}
                        alt="Image"
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          maxHeight: "500px",
                        }}
                      />
                    </div>
                  )}
                </Carousel>
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded z-10"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CustomModal>
    </>
  );
}

export default ShowActivity;
