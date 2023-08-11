import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./ViewWorkshop.css";
import Sidebar from "../Home/Sidebar";

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
              <div
                key={user.id}
                className={`object-name ${
                  selectedObject === user.id ? "active" : ""
                }`}
                onClick={() => handleObjectClick(user.id)}
              >
                {user.name}
              </div>
            ))}
          </div>
          <div className="object-details">
            {selectedObject && (
              <div className="json-card">
                <h2>{users.find((user) => user.id === selectedObject).name}</h2>
                {Object.entries(
                  users.find((user) => user.id === selectedObject)
                ).map(([key, value]) => (
                  <div key={key} className="property">
                    <span className="label">{key}:</span>
                    <span className="value">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewWorkshop;
