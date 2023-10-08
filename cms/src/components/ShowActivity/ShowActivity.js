import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowActivity.css";
import Sidebar from "../Home/Sidebar";

function ShowActivity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/db/activities.php")
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
      <div className="activities-container">
        {activities.map((activity) => (
          <section className="acSec" key={activity.ActivityID}>
            <div className="activity-item">
              <div
                style={{
                  backgroundImage: `url(${activity.PhotosVideos})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "900px",
                  height: "600px",
                  opacity: "0.6",
                }}
              >
                <div
                  className="content"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
                >
                  <button
                    className="deletee-button"
                    onClick={() => {
                      let res = window.confirm("Do you want to delete?");
                      if (res) {
                        handleDelete(activity.ActivityID);
                      }
                    }}
                  >
                    Delete
                  </button>
                  <h2>{activity.Title}</h2>
                  <p>{activity.Description}</p>
                  <p>Date and Time: {activity.DateAndTime}</p>
                  <p>Location: {activity.Location}</p>
                  <p>Organizer: {activity.Organizer}</p>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

export default ShowActivity;
