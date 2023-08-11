import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Home/Sidebar";
import axios from "axios";

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

function Student() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/home");
  };

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
    setOpen(true);
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
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h4" style={{ textAlign: "center" }}>
              Student Record
            </Typography>
            <Container
              style={{
                display: "flex",
                height: "90%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button onClick={toggleModalOpen} className="btn-modal">
                Add Student Record
              </Button>

              <Button
                className="btn-modal button"
                onClick={() => {
                  navigate("/getStudent");
                }}
              >
                List Student Records
              </Button>
            </Container>
          </Box>
        </Modal>
      </div>
      {/* <div className="button-container">
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
      </div> */}
      <section>
        {modal && (
          <div className="modal" style={{ position: "relative", zIndex: 4 }}>
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
