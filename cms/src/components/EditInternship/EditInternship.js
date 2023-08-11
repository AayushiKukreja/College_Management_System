import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./EditIntern.css";
import { useParams } from "react-router-dom";

function EditInternship() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [inputs, setInputs] = useState({
    id: id,
    duration: "",
    company: "",
    stipend: "",
    doj: "",
  });

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    axios
      .get(`http://localhost:8080/db/internship.php/${id}`)
      .then(function (res) {
        console.log(res.data[0]);
        setInputs({
          ...inputs,
          duration: res.data[0].duration,
          company: res.data[0].company,
          stipend: res.data[0].stipend,
          doj: res.data[0].doj,
        });
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "put",
      url: "http://localhost:8080/db/internship.php",
      data: inputs,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        navigate("/getInternStudent");
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  return (
    <div className="internContainer">
      <div class="formContainer">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div class="form-group">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <label htmlFor="email">Duration in months</label>
            <input
              required
              autoComplete="off"
              type="text"
              placeholder="Duration"
              value={inputs.duration}
              name="duration"
              onChange={(e) => {
                setInputs({ ...inputs, duration: e.target.value });
              }}
            ></input>
          </div>
          <div class="form-group">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <label htmlFor="password">Company</label>
            <input
              required
              autoComplete="off"
              type="text"
              placeholder="Company"
              value={inputs.company}
              name="company"
              onChange={(e) => {
                setInputs({ ...inputs, company: e.target.value });
              }}
            ></input>
          </div>

          <div class="form-group">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <label htmlFor="password">Date of Joining</label>
            <input
              required
              autoComplete="off"
              type="date"
              placeholder="DOJ"
              value={inputs.doj}
              name="doj"
              onChange={(e) => {
                setInputs({ ...inputs, doj: e.target.value });
              }}
            ></input>
          </div>
          <div class="form-group">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <label htmlFor="password">Stipend</label>
            <input
              required
              autoComplete="off"
              type="text"
              placeholder="Stipend"
              value={inputs.stipend}
              name="stipend"
              onChange={(e) => {
                setInputs({ ...inputs, stipend: e.target.value });
              }}
            ></input>
          </div>
          <input
            className="submit-button"
            type="submit"
            id="sumbit"
            name="submit"
            value="Update"
          />
        </form>
      </div>
    </div>
  );
}

export default EditInternship;
