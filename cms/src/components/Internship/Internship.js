import React from "react";
import Sidebar from "../Home/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Internship.css";
import { motion } from "framer-motion";

function Internship() {
  let navigate = useNavigate();
  const [empId, setEmpId] = useState("");
  const [duration, setDuration] = useState("");
  const [company, setCompany] = useState("");
  const [stipend, setStipend] = useState("");
  const [doj, setDoj] = useState("");
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

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  function Submit(e) {
    e.preventDefault();
    if (
      empId == "" ||
      duration == "" ||
      company == "" ||
      stipend == "" ||
      doj == ""
    ) {
      alert("Please Fill The Form Completely!!");
    } else {
      const fData = new FormData();
      fData.append("duration", duration);
      fData.append("empId", empId);
      fData.append("company", company);
      fData.append("stipend", stipend);
      fData.append("doj", doj);

      axios({
        method: "post",
        url: "http://localhost:8080/db/internship.php",
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
      <motion.div
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
      >
        <center>
          <h2 className="internH2">Add Internship Record</h2>
        </center>
        <div className="formContainer">
          <motion.form
            initial="hidden"
            animate="visible"
            variants={formVariants}
            transition={{ duration: 0.5 }}
          >
            <div className="form-group">
              <label htmlFor="name">Enrollment id</label>
              <input
                autoComplete="off"
                required
                type="text"
                name="empId"
                onChange={(e) => {
                  setEmpId(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="email">Duration in months</label>
              <input
                required
                autoComplete="off"
                type="text"
                name="duration"
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Company</label>
              <input
                required
                autoComplete="off"
                type="text"
                name="company"
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Date of Joining</label>
              <input
                required
                autoComplete="off"
                type="date"
                placeholder="(dd-mm-yyyy)"
                name="doj"
                onChange={(e) => {
                  setDoj(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Stipend</label>
              <input
                required
                autoComplete="off"
                type="text"
                name="stipend"
                onChange={(e) => {
                  setStipend(e.target.value);
                }}
              ></input>
            </div>

            <div className="buttonContainer">
              <motion.button
                type="submit"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="pressed"
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
                  navigate("/getInternStudent");
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
}

export default Internship;
