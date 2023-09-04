import React from "react";
import { useState } from "react";
import "./Research.css";
import Sidebar from "../Home/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Research = () => {
  const [paperId, setPaperId] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [abstract, setAbstract] = useState("");
  const [url, setUrl] = useState("");
  const [role, setRole] = useState("");
  let navigate = useNavigate();

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      paperId == "" ||
      title == "" ||
      authors == "" ||
      publicationDate == "" ||
      abstract == "" ||
      url == "" ||
      role == ""
    ) {
      alert("Please Fill The Form Completely!!");
    } else {
      const fData = new FormData();
      fData.append("paperId", paperId);
      fData.append("title", title);
      fData.append("authors", authors);
      fData.append("publicationDate", publicationDate);
      fData.append("abstract", abstract);
      fData.append("url", url);
      fData.append("role", role);
      console.log(fData);
      axios({
        method: "post",
        url: "http://localhost:8080/db/research.php",
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
  };

  return (
    <>
      <Sidebar />
      <div className="research">
        <motion.h2
          className="researchTitle"
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          Add Research Paper Record
        </motion.h2>
        <motion.form
          className="paper-form"
          onSubmit={handleSubmit}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="form-group">
            <label htmlFor="paperId">Paper Id:</label>
            <input
              required
              type="text"
              name="paperId"
              onChange={(e) => {
                setPaperId(e.target.value);
              }}
              id="paperId"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              required
              type="text"
              autoComplete="off"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              id="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="authors">Authors:</label>
            <input
              required
              type="text"
              name="authors"
              autoComplete="off"
              onChange={(e) => {
                setAuthors(e.target.value);
              }}
              id="authors"
            />
          </div>
          <div className="form-group">
            <label htmlFor="publicationDate">Publication Date:</label>
            <input
              required
              type="date"
              name="publicationDate"
              onChange={(e) => {
                setPublicationDate(e.target.value);
              }}
              id="publicationDate"
            />
          </div>
          <div className="form-group">
            <label htmlFor="abstract">Abstract:</label>
            <textarea
              required
              name="abstract"
              autoComplete="off"
              onChange={(e) => {
                setAbstract(e.target.value);
              }}
              id="abstract"
              rows="5"
              cols="80"
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">URL:</label>
            <input
              type="text"
              name="url"
              required
              autoComplete="off"
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              id="url"
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">Role:</label>
            <select
              required
              name="role"
              id="role"
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option>Choose</option>
              <option>Teacher</option>
              <option>Student</option>
            </select>
          </div>

          <div className="button-Container">
            <motion.button
              type="submit"
              className="submitButton"
              id="sumbit"
              name="submit"
              value="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Submit Record
            </motion.button>
            <motion.button
              className="resetButton"
              onClick={() => {
                navigate("/getResearchPaper");
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              List Records
            </motion.button>
          </div>
        </motion.form>
      </div>
    </>
  );
};

export default Research;
