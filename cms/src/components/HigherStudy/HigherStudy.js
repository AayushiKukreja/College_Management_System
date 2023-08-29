import React from "react";
import Sidebar from "../Home/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HigherStudy.css";
const HigherStudy = () => {
  let navigate = useNavigate();
  const [empId, setEmpId] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [modal, setModal] = useState(false);

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
      <h2>Add Higher Study Record</h2>
      <div className="formContainer">
        <form>
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
            <button
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
            </button>
            <button
              className="reset-button"
              onClick={() => {
                navigate("/getHigherStudyStudent");
              }}
            >
              List Records
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default HigherStudy;
