import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./EditStudent.css";

function EditStudent() {
  const { id } = useParams();
  console.log(id);
  let navigate = useNavigate();
  const [inputs, setInputs] = useState({
    id: id,
    enrollmentId: "",
    sname: "",
    email: "",
    gender: "",
    department: "",
    passingYear: "",
    dob: "",
  });

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    axios
      .get(`http://localhost:8080/db/student.php/${id}`)
      .then(function (res) {
        console.log(res.data[0]);
        setInputs({
          ...inputs,
          sname: res.data[0].sname,
          email: res.data[0].email,
          enrollmentId: res.data[0].enrollmentId,
          gender: res.data[0].gender,
          department: res.data[0].department,
          passingYear: res.data[0].passingYear,
          dob: res.data[0].dob,
        });
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "put",
      url: "http://localhost:8080/db/student.php",
      data: inputs,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        navigate("/getStudent");
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
              value={inputs.sname}
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={(e) => {
                setInputs({ ...inputs, sname: e.target.value });
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
              value={inputs.enrollmentId}
              onChange={(e) => {
                setInputs({ ...inputs, enrollmentId: e.target.value });
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
              placeholder="Passing Year"
              name="PassingYear"
              value={inputs.passingYear}
              onChange={(e) => {
                setInputs({ ...inputs, passingYear: e.target.value });
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
              navigate("/getStudent");
            }}
          >
            CLOSE
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;
