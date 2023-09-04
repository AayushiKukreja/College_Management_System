import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./ViewWorkshop.css";
import Sidebar from "../Home/Sidebar";
import { motion } from "framer-motion";

const ViewWorkshop = () => {
  const [selectedObject, setSelectedObject] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/db/workshop.php/")
      .then(function (response) {
        console.log(response);
        setUsers(response.data);
      });
  }, []);
  console.log(users);

  const handleObjectClick = (objectName) => {
    setSelectedObject(objectName);
  };

  return (
    <>
      <Sidebar />
      <div className="json-container">
        <h1>Upcoming Workshops</h1>
        <div className="json-content">
          <div className="object-list">
            {users?.map((user) => (
              <motion.div
                key={user.id}
                className={`object-name ${
                  selectedObject === user.id ? "active" : ""
                }`}
                onClick={() => handleObjectClick(user.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {user.name}
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
                <h2>{users.find((user) => user.id === selectedObject).name}</h2>
                {Object.entries(
                  users.find((user) => user.id === selectedObject)
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
    </>
  );
};

export default ViewWorkshop;
