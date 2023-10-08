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
import "./Student.css";

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
  const [modal, setModal] = useState(false);
  const [selectedfile, setFile] = useState(null);
  const toggleModal = () => {
    setModal(!modal);
    setOpen(true);
  };

  const handleClose = () => {
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();

      const allowedExtensions = ["xls", "csv", "xlsx"];

      if (allowedExtensions.includes(fileExtension)) {
        setFile(file);
      } else {
        alert("Invalid file extension. Please choose a valid file.");
      }
    }
  };

  function submit(e) {
    e.preventDefault();
    if (selectedfile === null) {
      alert("Please attach a file!!");
    } else {
      const fData = new FormData();
      fData.append("file", selectedfile);

      axios({
        method: "post",
        url: "http://localhost:8080/db/student.php",
        data: fData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then(function (response) {
          console.log(response);
          alert("New file Successfully Added.");
        })
        .catch(function (response) {
          console.log(response);
        });
    }
  }

  return (
    <>
      <Sidebar />
      <div className="stuImg">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70%",
              maxWidth: 500,
              height: "auto",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 2,
              zIndex: 1,
            }}
          >
            <Typography
              variant="h5"
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "1.5rem",
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
                Add Student Record
              </Button>

              <Button
                className="btn-modal"
                onClick={() => {
                  navigate("/getStudent");
                }}
                style={{
                  background: "#d3386c",
                  color: "#fff",
                  width: "100%",
                }}
              >
                List Student Records
              </Button>
            </Container>
          </Box>
        </Modal>
      </div>

      <section>
        {modal && (
          <div className="modal">
            <div className="overlay">
              <form className="modal-form" enctype="multipart/form-data">
                <input
                  type="file"
                  name="import_file"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <button
                  type="submit"
                  name="save_excel_data"
                  onClick={(event) => submit(event)}
                  className="import-button"
                >
                  Import
                </button>
                <button className="close-modal" onClick={toggleModal}>
                  CLOSE
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Student;
