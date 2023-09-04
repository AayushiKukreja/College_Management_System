import React from "react";
import { useState } from "react";
import "./Workshop.css";
import Sidebar from "../Home/Sidebar";
import axios from "axios";
import { motion } from "framer-motion";

const Workshop = () => {
  const [workshopName, setWorkshopName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(false);
  const [location, setLocation] = useState(false);
  const [instructors, setInstructors] = useState(false);

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.1,
        ease: "easeOut",
      },
    },
  };

  const headingVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 2.5,
        type: "spring",
        stiffness: 150,
      },
    },
  };

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
      <motion.div
        className="heading"
        initial="hidden"
        animate="visible"
        variants={headingVariants}
      >
        <h1>Workshop Registration Form</h1>
      </motion.div>

      <div className="workshop-form-container">
        <form onSubmit={handleSubmit} className="workshop-form">
          <motion.label
            className="workshop-label"
            htmlFor="workshopName"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            Title:
          </motion.label>
          <motion.input
            className="workshop-input"
            type="text"
            autoComplete="off"
            name="workshopName"
            onChange={(e) => {
              setWorkshopName(e.target.value);
            }}
            required
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.label
            className="workshop-label"
            htmlFor="workshopName"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            Description:
          </motion.label>
          <motion.textarea
            autoComplete="off"
            className="workshop-input"
            name="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
            rows="3"
            cols="80"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.label
            className="workshop-label"
            htmlFor="workshopName"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            Start Date:
          </motion.label>
          <motion.input
            autoComplete="off"
            className="workshop-input"
            type="date"
            name="startDate"
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            required
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.label
            className="workshop-label"
            htmlFor="workshopName"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            End Date:
          </motion.label>
          <motion.input
            autoComplete="off"
            className="workshop-input"
            type="date"
            name="endDate"
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
            required
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.label
            className="workshop-label"
            htmlFor="workshopName"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            Location:
          </motion.label>
          <motion.input
            autoComplete="off"
            className="workshop-input"
            type="text"
            name="location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            required
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.label
            className="workshop-label"
            htmlFor="workshopName"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            Instructor:
          </motion.label>
          <motion.input
            autoComplete="off"
            className="workshop-input"
            type="text"
            name="instrcutors"
            onChange={(e) => {
              setInstructors(e.target.value);
            }}
            required
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          />

          <motion.button
            type="submit"
            className="workshop-button"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            Submit
          </motion.button>
        </form>
      </div>
    </>
  );
};

export default Workshop;
