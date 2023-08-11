import React from "react";
import { useState } from "react";
import "./Workshop.css";
import Sidebar from "../Home/Sidebar";
import axios from "axios";

const Workshop = () => {
  const [workshopName, setWorkshopName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(false);
  const [location, setLocation] = useState(false);
  const [instructors, setInstructors] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const fData = new FormData();
    fData.append("name", workshopName);
    fData.append("description", description);
    fData.append("startDate", startDate);
    fData.append("endDate", endDate);
    fData.append("location", location);
    fData.append("instructor", instructors);

    axios({
      method: "post",
      url: "http://localhost:8080/db/workshop.php",
      data: fData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        console.log(response);
        alert(response.data);
      })
      .catch(function (response) {
        alert("ERRORR!!!!");
      });
  }

  return (
    <>
      <Sidebar />
      <div className="workshop-form-container">
        <h1>Workshop Registration Form</h1>
        <form onSubmit={handleSubmit} className="workshop-form">
          <label className="workshop-label" htmlFor="workshopName">
            Title:
          </label>
          <input
            className="workshop-input"
            type="text"
            autoComplete="off"
            name="workshopName"
            onChange={(e) => {
              setWorkshopName(e.target.value);
            }}
            required
          />
          <label className="workshop-label" htmlFor="workshopName">
            Description:
          </label>
          <textarea
            autoComplete="off"
            className="workshop-input"
            name="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
            rows="2"
            cols="50"
          />
          <label className="workshop-label" htmlFor="workshopName">
            Start Date:
          </label>
          <input
            autoComplete="off"
            className="workshop-input"
            type="date"
            name="startDate"
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            required
          />
          <label className="workshop-label" htmlFor="workshopName">
            End Date:
          </label>
          <input
            autoComplete="off"
            className="workshop-input"
            type="date"
            name="endDate"
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
            required
          />
          <label className="workshop-label" htmlFor="workshopName">
            Location:
          </label>
          <input
            autoComplete="off"
            className="workshop-input"
            type="text"
            name="location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            required
          />
          <label className="workshop-label" htmlFor="workshopName">
            Instructor:
          </label>
          <input
            autoComplete="off"
            className="workshop-input"
            type="text"
            name="instrcutors"
            onChange={(e) => {
              setInstructors(e.target.value);
            }}
            required
          />

          {/* Other input fields can be added similarly */}
          <button type="submit" className="workshop-button ">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Workshop;
