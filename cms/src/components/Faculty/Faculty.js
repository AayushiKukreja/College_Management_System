import React, { useEffect } from "react";
import Sidebar from "../Home/Sidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Faculty.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Faculty() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [empId, setEmpId] = useState("");
  const [gender, setGender] = useState("");
  const [dept, setDept] = useState("");
  const [higherStudies, setHigherStudies] = useState("");
  const [dob, setDob] = useState("");
  const [designation, setDesignation] = useState("");
  const [modal, setModal] = useState(false);
  function Submit(e) {
    e.preventDefault();
    const fData = new FormData();
    fData.append("email", email);
    fData.append("name", name);
    fData.append("empId", empId);
    fData.append("gender", gender);
    fData.append("dept", dept);
    fData.append("higherStudies", higherStudies);
    fData.append("designation", designation);
    fData.append("dob", dob);

    axios({
      method: "post",
      url: "http://localhost:8080/db/faculty.php",
      data: fData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        console.log(response);
        alert("New faculty Successfully Added.");
      })
      .catch(function (response) {
        console.log(response);
      });
  }
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <Sidebar />
      <div className="button-container">
        <button onClick={toggleModal} className="btn-modal ">
          Add Faculty Member
        </button>
        <button
          className="btn-modal button "
          onClick={() => {
            navigate("/getFaculty");
          }}
        >
          List Faculty Members
        </button>
      </div>

      <section>
        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div class="form-box">
              <div class="form-value">
                <form>
                  <div class="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input
                      required
                      autoComplete="off"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div class="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input
                      required
                      autoComplete="off"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>
                  <div class="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input
                      required
                      autoComplete="off"
                      type="text"
                      placeholder="Enter your employee id"
                      name="empId"
                      onChange={(e) => {
                        setEmpId(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div class="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input
                      required
                      autoComplete="off"
                      type="text"
                      placeholder="Gender"
                      name="gender"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div class="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input
                      required
                      autoComplete="off"
                      type="text"
                      placeholder="Department"
                      name="dept"
                      onChange={(e) => {
                        setDept(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div class="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input
                      required
                      autoComplete="off"
                      type="text"
                      placeholder="Higher Studies"
                      name="higherStudies"
                      onChange={(e) => {
                        setHigherStudies(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div class="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input
                      required
                      type="text"
                      placeholder="DOB"
                      name="dob"
                      onChange={(e) => {
                        setDob(e.target.value);
                      }}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    ></input>
                  </div>
                  <div class="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input
                      required
                      type="text"
                      autoComplete="off"
                      placeholder="Designation"
                      name="designation"
                      onChange={(e) => {
                        setDesignation(e.target.value);
                      }}
                    ></input>
                  </div>
                  <input
                    class="loginButton"
                    type="submit"
                    id="sumbit"
                    name="submit"
                    value="submit"
                    onClick={(e) => {
                      Submit(e);
                    }}
                  />
                  <button className="close-modal" onClick={toggleModal}>
                    CLOSE
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Faculty;