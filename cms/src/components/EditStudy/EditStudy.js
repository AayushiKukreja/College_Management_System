import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const EditStudy = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [inputs, setInputs] = useState({
    id: id,
    course: "",
    college: "",
  });

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    axios
      .get(`http://localhost:8080/db/higherStudy.php/${id}`)
      .then(function (res) {
        console.log(res.data[0]);
        setInputs({
          ...inputs,
          course: res.data[0].course,
          college: res.data[0].college,
        });
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "put",
      url: "http://localhost:8080/db/higherStudy.php",
      data: inputs,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        navigate("/getHigherStudyStudent");
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
            <label htmlFor="email">Course</label>
            <input
              required
              type="text"
              autoComplete="off"
              value={inputs.course}
              name="course"
              onChange={(e) => {
                setInputs({ ...inputs, course: e.target.value });
              }}
            ></input>
          </div>
          <div class="form-group">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <label htmlFor="password">College</label>
            <input
              required
              type="text"
              autoComplete="off"
              placeholder="College"
              value={inputs.college}
              name="college"
              onChange={(e) => {
                setInputs({ ...inputs, college: e.target.value });
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

export default EditStudy;
