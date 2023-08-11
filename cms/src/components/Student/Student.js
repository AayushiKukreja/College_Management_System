import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Home/Sidebar";
import axios from "axios";

function Student() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [empId, setEmpId] = useState("");
  const [gender, setGender] = useState("");
  const [dept, setDept] = useState("");
  const [passingYear, setPassingYear] = useState("");
  const [dob, setDob] = useState("");
  const [modal, setModal] = useState(false);
  const [setInputType, inputType] = useState("text");

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
    fData.append("email", email);
    fData.append("name", name);
    fData.append("empId", empId);
    fData.append("gender", gender);
    fData.append("dept", dept);
    fData.append("passingYear", passingYear);
    fData.append("dob", dob);

    axios({
      method: "post",
      url: "http://localhost:8080/db/student.php",
      data: fData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        console.log(response);
        alert("New Student Successfully Added.");
      })
      .catch(function (response) {
        console.log(response);
      });
  }
  const handleFocus = () => {
    setInputType("date");
  };
  return (
    <>
      <Sidebar />
      <div className="button-container">
        <button onClick={toggleModal} className="btn-modal">
          Add Student Record
        </button>
        <button
          className="btn-modal button"
          onClick={() => {
            navigate("/getStudent");
          }}
        >
          List Student Records
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
                      placeholder="Enter your enrollment id"
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
                      placeholder="Passing Year"
                      name="passingYear"
                      onChange={(e) => {
                        setPassingYear(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div class="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input
                      placeholder="DOB"
                      type="text"
                      required
                      autoComplete="off"
                      onChange={(e) => {
                        setDob(e.target.value);
                      }}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
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

export default Student;
