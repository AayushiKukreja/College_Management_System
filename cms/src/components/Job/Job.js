import React from "react";
import Sidebar from "../Home/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Job() {
  let navigate = useNavigate();
  const [empId, setEmpId] = useState("");
  const [stipend, setStipend] = useState("");
  const [company, setCompany] = useState("");
  const [doj, setDoj] = useState("");
  const [modal, setModal] = useState(false);

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
    const fData = new FormData();
    fData.append("stipend", stipend);
    fData.append("empId", empId);
    fData.append("company", company);
    fData.append("doj", doj);

    axios({
      method: "post",
      url: "http://localhost:8080/db/job.php",
      data: fData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        console.log(response);
        alert(response.data);
      })
      .catch(function (response) {
        console.log(response);
        alert(response.data);
      });
  }

  return (
    <>
      <Sidebar />
      <center>
        <h2>Add Job Record</h2>
      </center>
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
            <label htmlFor="email">Package in LPA</label>
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
              type="date"
              placeholder="(dd-mm-yyyy)"
              name="doj"
              onChange={(e) => {
                setDoj(e.target.value);
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
                navigate("/getjob");
              }}
            >
              List Records
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Job;
