import React, { useEffect } from "react";
import Sidebar from "../Home/Sidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Faculty.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container, Stack } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: 1,
};

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
  const [open, setOpen] = React.useState(true);

  const toggleModal = () => {
    setModal(!modal);
    setOpen(true);
  };

  const handleClose = () => {
    //setOpen(false);
    navigate("/home");
  };

  const toggleModalOpen = () => {
    setModal(!modal);
    setOpen(false);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  function Submit(e) {
    e.preventDefault();
    if (
      email == "" ||
      name == "" ||
      empId == "" ||
      gender == "" ||
      dept == "" ||
      higherStudies == "" ||
      designation == "" ||
      dob == ""
    ) {
      alert("Please Fill The Form Completely!!");
    } else {
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
  }

  return (
    <>
      <Sidebar />
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/* <Box sx={style}>
            <Typography
              variant="h5"
              style={{ textAlign: "center", color: "black" }}
            >
              Faculty Record
            </Typography>
            <Container
              style={{
                display: "flex",
                height: "90%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                onClick={toggleModalOpen}
                className="btn-modal"
                style={{
                  background: "#d3386c",
                  color: "#fff",
                }}
              >
                Add Faculty Member
              </Button>

              <Button
                className="btn-modal"
                onClick={() => {
                  navigate("/getFaculty");
                }}
                style={{
                  background: "#d3386c",
                  color: "#fff",
                }}
              >
                List Faculty Members
              </Button>
            </Container>
          </Box>
         */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70%", // Adjust width for smaller devices
              maxWidth: 500, // Set a maximum width for larger screens
              height: "auto", // Let the content determine the height
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 2, // Adjust padding for smaller devices
              zIndex: 1,
            }}
          >
            <Typography
              variant="h5"
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "1.5rem", // Adjust font size for smaller devices
              }}
            >
              Student Record
            </Typography>
            <Container
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <Button
                onClick={toggleModalOpen}
                className="btn-modal"
                style={{
                  background: "#d3386c",
                  color: "#fff",
                  marginBottom: "1rem",
                  width: "100%",
                }}
              >
                Add Faculty Member
              </Button>

              <Button
                className="btn-modal"
                onClick={() => {
                  navigate("/getFaculty");
                }}
                style={{
                  background: "#d3386c",
                  color: "#fff",
                  width: "100%",
                }}
              >
                List Faculty Members
              </Button>
            </Container>
          </Box>
        </Modal>
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
