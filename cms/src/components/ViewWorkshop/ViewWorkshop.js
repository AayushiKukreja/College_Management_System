import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewWorkshop.css";
import Sidebar from "../Home/Sidebar";
import { motion } from "framer-motion";

const ViewWorkshop = () => {
  const [workshops, setWorkshops] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [userEmail, setUserEmail] = useState(localStorage.getItem("email"));
  const [userRegisteredWorkshops, setUserRegisteredWorkshops] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/db/workshop.php/").then((response) => {
      setWorkshops(response.data);
    });
    console.log(workshops);

    axios
      .get("http://localhost:8080/db/workshopRegister.php", {
        params: { user_email: userEmail },
      })
      .then((response) => {
        setUserRegisteredWorkshops(response.data);
      });
  }, [userEmail]);

  const handleObjectClick = (objectName) => {
    setSelectedObject(objectName);
  };

  const isWorkshopRegistered = (workshopId) => {
    return userRegisteredWorkshops.some(
      (registration) =>
        registration.workshop_id === workshopId &&
        registration.user_email === userEmail
    );
  };

  console.log(userRegisteredWorkshops);
  const handleRegister = () => {
    if (!userEmail) {
      alert("Please enter your email.");
      return;
    }

    if (selectedWorkshop.registered) {
      alert("You are already registered for this workshop.");
      return;
    }

    const updatedWorkshops = workshops.map((workshop) => {
      if (workshop.id === selectedWorkshop.id) {
        return { ...workshop, registered: true };
      }
      return workshop;
    });

    const fData = new FormData();
    fData.append("workshop_id", selectedWorkshop.id);
    fData.append("user_email", userEmail);

    axios({
      method: "post",
      url: "http://localhost:8080/db/workshopRegister.php",
      data: fData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((response) => {
        console.log(response.data);
        if (
          response.data ===
          "message => User is already registered for this workshop"
        ) {
          alert("You are already registered!!");
        } else {
          setWorkshops(updatedWorkshops);
          setShowModal(false);
          alert("You have been registered!!");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Registration failed. Please try again.");
      });
  };

  const handleRegisterClick = (workshop) => {
    setSelectedWorkshop(workshop);
    setShowModal(true);
  };

  return (
    <>
      <Sidebar />
      <div className="json-container">
        <h1 className="text-2xl font-bold">Upcoming Workshops</h1>
        <div className="json-content">
          <div className="object-list">
            {workshops.map((workshop) => (
              <motion.div
                key={workshop.id}
                className="object-name"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                onClick={() => handleObjectClick(workshop.id)}
              >
                {workshop.name}
                {isWorkshopRegistered(workshop.id) ? (
                  <span className="registered-status">Registered</span>
                ) : (
                  <button
                    className="register-button"
                    onClick={() => handleRegisterClick(workshop)}
                    disabled={isWorkshopRegistered(workshop.id)}
                  >
                    {selectedWorkshop === workshop
                      ? "Registering..."
                      : "Register"}
                  </button>
                )}
              </motion.div>
            ))}
          </div>
          <div className="object-details">
            {selectedObject && (
              <motion.div
                className="json-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2>
                  {
                    workshops.find((workshop) => workshop.id === selectedObject)
                      .name
                  }
                </h2>
                {Object.entries(
                  workshops.find((workshop) => workshop.id === selectedObject)
                ).map(([key, value]) => (
                  <motion.div
                    key={key}
                    className="property"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <span className="label">{key}:</span>
                    <span className="value">{value}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Register for Workshop</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              disabled={selectedWorkshop.registered}
            />
            <button
              className="register-button"
              onClick={handleRegister}
              disabled={selectedWorkshop.registered}
            >
              {selectedWorkshop.registered ? "Registered" : "Register"}
            </button>
            <button className="close-modal" onClick={() => setShowModal(false)}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewWorkshop;
