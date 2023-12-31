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
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Dashboard = () => {
  const [data, setData] = useState("");
  let navigate = useNavigate();

  const [ref, inView] = useInView({
    threshold: 1,
  });

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 2.8,
      },
    },
  };

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
      <section>
        <motion.h1
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          className="text-2xl font-bold"
        >
          Graphic Era College Management System
        </motion.h1>
        <img src="./graphic_era1.jpg" alt="" />
      </section>
      <div class="containerr">
        <div class="main">
          <div class="main-skills">
            <motion.div
              className="card"
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              ref={ref}
            >
              <PiStudentBold />
              <h3>Students Registered</h3>
              <div className="dataContainer">
                <div className="dataBackground">
                  <h5 className="text-4xl font-bold">{data[0]}</h5>
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
            </motion.div>
            <motion.div
              className="card"
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              ref={ref}
            >
              <GiTeacher />
              <h3>Faculties Registered</h3>
              <div className="dataContainer">
                <div className="dataBackground">
                  <h5 className="text-4xl font-bold">{data[1]}</h5>
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
            </motion.div>
            <motion.div
              className="card"
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              ref={ref}
            >
              <ImNewspaper />
              <h3 class="heading">Papers Published</h3>
              <div className="dataContainer">
                <div className="dataBackground">
                  <h5 className="text-4xl font-bold">{data[2]}</h5>
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
            </motion.div>
            <motion.div
              className="card"
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              ref={ref}
            >
              <GrWorkshop />
              <h3>Upcoming Workshops</h3>
              <div className="dataContainer">
                <div className="dataBackground">
                  <h5 className="text-4xl font-bold">{data[3]}</h5>
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
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
