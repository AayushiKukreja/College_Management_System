import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowActivity.css";
import Sidebar from "../Home/Sidebar";
//import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Carousel } from "react-bootstrap";
import $ from "jquery";
import "datatables.net-bs4";

function ShowActivity() {
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

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

        $(document).ready(function () {
          $("#activityTable").DataTable();
        });
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
      });
  });

  console.log(activities);

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
        <table id="activityTable" className="table">
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
            {activities == "No activity found" ? (
              <td colSpan="8">
                <h1>No Data found!!</h1>
              </td>
            ) : (
              activities.map((activity) => (
                <tr key={activity.ActivityID}>
                  <td>{activity.Title}</td>
                  <td>{activity.Description}</td>
                  <td>{activity.DateAndTime}</td>
                  <td>{activity.Location}</td>
                  <td>{activity.Organizer}</td>
                  <td>{activity.dept}</td>
                  <td>
                    <div className="d-flex">
                      <button
                        className="btn btn-danger"
                        style={{
                          padding: "0.25rem 0.5rem",
                          fontSize: "0.875rem",
                          lineHeight: "1.25",
                        }}
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
                        className="btn btn-primary"
                        style={{
                          padding: "0.25rem 0.5rem",
                          fontSize: "0.875rem",
                          lineHeight: "1.25",
                        }}
                        onClick={() => {
                          setShowModal(true);
                          setSelectedActivity(activity);
                        }}
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for View */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>View Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedActivity && (
            <Carousel>
              {Array.isArray(selectedActivity.PhotosVideos) ? (
                selectedActivity.PhotosVideos.map((url, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={url}
                      alt={`Image ${index + 1}`}
                    />
                  </Carousel.Item>
                ))
              ) : (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={selectedActivity.PhotosVideos}
                    alt="Activity Image"
                  />
                </Carousel.Item>
              )}
            </Carousel>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ShowActivity;
