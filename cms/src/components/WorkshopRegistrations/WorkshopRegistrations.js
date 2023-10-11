import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useEffect } from "react";
import "./WorkshopReg.css";
import Sidebar from "../Home/Sidebar";

const WorkshopRegistrations = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [workshopData, setWorkshopData] = useState([]);

  const openModal = () => {
    setModalIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/db/getWorkshopRegistrations.php")
      .then(function (response) {
        console.log(response);
        setWorkshopData(response.data);
      })
      .catch(function (error) {
        console.error("Error fetching workshop data: ", error);
      });
  }, []);

  return (
    <>
      <Sidebar />
      <div className="WorkImg">
        <div className="workshop-container">
          <div
            className="workshop-reg-container"
            style={{
              padding: "10px",
              borderRadius: "8px",
              margin: "150px",
            }}
          >
            <button className="view-reg-button" onClick={openModal}>
              View Registrations
            </button>
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Workshop Registrations"
            className="modall"
            overlayClassName="overlay"
          >
            <h2>Workshop Registrations</h2>
            <table className="workTable">
              <thead>
                <tr>
                  <th>Workshop ID</th>
                  <th>User Name</th>
                  <th>Workshop Name</th>
                  <th>Instructor Name</th>
                </tr>
              </thead>
              <tbody>
                {workshopData.map((registration, index) => (
                  <tr key={index}>
                    <td>{registration.workshop_id}</td>
                    <td>{registration.user_email}</td>
                    <td>{registration.name}</td>
                    <td>{registration.instructor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default WorkshopRegistrations;