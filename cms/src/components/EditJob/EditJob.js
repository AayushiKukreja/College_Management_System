import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditJob = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [inputs, setInputs] = useState({
    id: id,
    stipend: "",
    company: "",
    doj: "",
  });

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    axios.get(`http://localhost:8080/db/job.php/${id}`).then(function (res) {
      console.log(res.data[0]);
      setInputs({
        ...inputs,
        stipend: res.data[0].package,
        company: res.data[0].company,
        doj: res.data[0].doj,
      });
    });
  }
  console.log(inputs);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "put",
      url: "http://localhost:8080/db/job.php",
      data: inputs,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        navigate("/getJob");
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
            <label htmlFor="email">Package</label>
            <input
              required
              type="text"
              autoComplete="off"
              value={inputs.stipend}
              name="duration"
              onChange={(e) => {
                setInputs({ ...inputs, stipend: e.target.value });
              }}
            ></input>
          </div>
          <div class="form-group">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <label htmlFor="password">Company</label>
            <input
              required
              type="text"
              autoComplete="off"
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
};

export default EditJob;
