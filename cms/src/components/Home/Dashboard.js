import React, { useState } from "react";
import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { ImNewspaper } from "react-icons/im";
import { GrWorkshop } from "react-icons/gr";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/db/dashboard.php")
      .then(function (response) {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Sidebar />
      {/* <div class="main-top">
        <h1>Dashboard</h1>
      </div> */}
      <h1>Dashboard</h1>
      <div class="containerr">
        <div class="main">
          <div class="main-skills">
            <div class="card">
              <PiStudentBold />
              <h3>Students Registered</h3>
              <div className="dataContainer">
                <div className="dataBackground">
                  <h5>{data[0]}</h5>
                </div>
              </div>
              <button
                className="dataButton"
                onClick={() => {
                  navigate("/getStudent");
                }}
              >
                View Data
              </button>
            </div>
            <div class="card">
              <GiTeacher />
              <h3>Faculties Registered</h3>
              <div className="dataContainer">
                <div className="dataBackground">
                  <h5>{data[1]}</h5>
                </div>
              </div>
              <button
                className="dataButton"
                onClick={() => {
                  navigate("/getFaculty");
                }}
              >
                View Data
              </button>
            </div>
            <div class="card">
              <ImNewspaper />
              <h3 class="heading">Papers Published</h3>
              <div className="dataContainer">
                <div className="dataBackground">
                  <h5>{data[2]}</h5>
                </div>
              </div>

              <button
                className="dataButton"
                onClick={() => {
                  navigate("/getResearchPaper");
                }}
              >
                View Data
              </button>
            </div>
            <div class="card">
              <GrWorkshop />
              <h3>Upcoming Workshops</h3>
              <div className="dataContainer">
                <div className="dataBackground">
                  <h5>{data[3]}</h5>
                </div>
              </div>
              <button
                className="dataButton"
                onClick={() => {
                  navigate("/viewWorkshop");
                }}
              >
                View Data
              </button>
            </div>
          </div>

          {/* <div class="main-course">
            <h1>My courses</h1>
            <div class="course-box">
              <ul>
                <li class="active">In progress</li>
                <li>explore</li>
                <li>incoming</li>
                <li>finished</li>
              </ul>
              <div class="course">
                <div class="box">
                  <h3>HTML</h3>
                  <p>80% - progress</p>
                  <button>continue</button>
                  <i class="fab fa-html5 html"></i>
                </div>
                <div class="box">
                  <h3>CSS</h3>
                  <p>50% - progress</p>
                  <button>continue</button>
                </div>
                <div class="box">
                  <h3>JavaScript</h3>
                  <p>30% - progress</p>
                  <button>continue</button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
