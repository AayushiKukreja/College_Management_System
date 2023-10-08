import React from "react";
import Sidebar from "../Home/Sidebar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function EditFaculty() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [inputs, setInputs] = useState({
    id: id,
    employeeId: "",
    username: "",
    email: "",
    gender: "",
    department: "",
    higher_study: "",
    dob: "",
    designation: "",
  });

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    axios
      .get(`http://localhost:8080/db/faculty.php/${id}`)
      .then(function (res) {
        console.log(res.data[0]);
        setInputs({
          ...inputs,
          username: res.data[0].username,
          email: res.data[0].email,
          employeeId: res.data[0].employeeId,
          gender: res.data[0].gender,
          department: res.data[0].department,
          higher_study: res.data[0].higher_study,
          dob: res.data[0].dob,
          designation: res.data[0].designation,
        });
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "put",
      url: "http://localhost:8080/db/faculty.php",
      data: inputs,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        navigate("/getfaculty");
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  return (
    <div class="form-box">
      <div class="form-value">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div class="inputbox">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              required
              autoComplete="off"
              value={inputs.username}
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={(e) => {
                setInputs({ ...inputs, username: e.target.value });
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
              value={inputs.email}
              name="email"
              onChange={(e) => {
                setInputs({ ...inputs, email: e.target.value });
              }}
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
              value={inputs.employeeId}
              onChange={(e) => {
                setInputs({ ...inputs, employeeId: e.target.value });
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
              value={inputs.gender}
              onChange={(e) => {
                setInputs({ ...inputs, gender: e.target.value });
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
              value={inputs.department}
              onChange={(e) => {
                setInputs({ ...inputs, department: e.target.value });
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
              value={inputs.higher_study}
              onChange={(e) => {
                setInputs({ ...inputs, higher_study: e.target.value });
              }}
            ></input>
          </div>
          <div class="inputbox">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              required
              autoComplete="off"
              type="date"
              placeholder="DOB"
              value={inputs.dob}
              name="dob"
              onChange={(e) => {
                setInputs({ ...inputs, dob: e.target.value });
              }}
            ></input>
          </div>
          <div class="inputbox">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              required
              type="text"
              autoComplete="off"
              placeholder="Designation"
              value={inputs.designation}
              name="designation"
              onChange={(e) => {
                setInputs({ ...inputs, designation: e.target.value });
              }}
            ></input>
          </div>
          <input
            class="loginButton"
            type="submit"
            id="sumbit"
            name="submit"
            value="Update"
          />
          <button
            className="closee-modal"
            onClick={(e) => {
              navigate("/getFaculty");
            }}
          >
            CLOSE
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditFaculty;
