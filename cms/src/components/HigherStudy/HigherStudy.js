import React from "react";
import Sidebar from "../Home/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HigherStudy.css";
import { motion } from "framer-motion";

const HigherStudy = () => {
  let navigate = useNavigate();
  const [empId, setEmpId] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [modal, setModal] = useState(false);

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    pressed: { scale: 0.9 },
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const headingVariants = {
    initial: {
      opacity: 0,
      y: -20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.3,
        ease: "easeOut",
      },
    },
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  function Submit(e) {
    e.preventDefault();
    if (empId == "" || college == "" || course == "") {
      alert("Please Fill The Form Completely!!");
    } else {
      const fData = new FormData();
      fData.append("course", course);
      fData.append("empId", empId);
      fData.append("college", college);
      axios({
        method: "post",
        url: "http://localhost:8080/db/higherStudy.php",
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
  }

  return (
    <>
      <Sidebar />

      <motion.h2
        variants={headingVariants}
        initial="initial"
        animate="animate"
        className="higherH1"
      >
        Add Higher Study Record
      </motion.h2>
      <motion.div
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
      >
        <div className="formm-Container">
          <motion.form
            initial="hidden"
            animate="visible"
            variants={formVariants}
            transition={{ duration: 0.5 }}
          >
            <div className="form-group">
              <label htmlFor="name">Enrollment id</label>
              <input
                required
                autoComplete="off"
                type="text"
                name="empId"
                onChange={(e) => {
                  setEmpId(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="email">Course</label>
              <input
                required
                autoComplete="off"
                type="text"
                name="course"
                onChange={(e) => {
                  setCourse(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">College</label>
              <input
                required
                autoComplete="off"
                type="text"
                name="college"
                onChange={(e) => {
                  setCollege(e.target.value);
                }}
              ></input>
            </div>
            <div className="buttonContainer">
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="pressed"
                type="submit"
                className="submit-button"
                id="sumbit"
                name="submit"
                value="submit"
                onClick={(e) => {
                  Submit(e);
                }}
              >
                Submit
              </motion.button>
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="pressed"
                className="reset-button"
                onClick={() => {
                  navigate("/getHigherStudyStudent");
                }}
              >
                List Records
              </motion.button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </>
  );
};

export default HigherStudy;
