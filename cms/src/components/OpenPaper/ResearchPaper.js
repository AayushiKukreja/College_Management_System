import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./OpenPaper.css";
import { useParams } from "react-router-dom";

const ResearchPaper = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [inputs, setInputs] = useState({
    id: id,
    paperId: "",
    title: "",
    authors: "",
    publicationDate: "",
    abstract: "",
    url: "",
    role: "",
  });

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    axios
      .get(`http://localhost:8080/db/research.php/${id}`)
      .then(function (res) {
        console.log(res.data[0]);
        setInputs({
          ...inputs,
          paperId: res.data[0].paperId,
          title: res.data[0].title,
          authors: res.data[0].authors,
          publicationDate: res.data[0].publicationDate,
          abstract: res.data[0].abstract,
          url: res.data[0].url,
        });
      });
  }

  return (
    <div class="formBox">
      <div class="form-value">
        <form>
          <div class="inputBox">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              required
              value={inputs.paperId}
              type="text"
              placeholder="PaperId"
              readOnly
            ></input>
          </div>
          <div class="inputBox">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              required
              type="text"
              placeholder="Title"
              value={inputs.title}
              readOnly
            ></input>
          </div>
          <div class="inputBox">
            <ion-icon name="lock-closed-outline"></ion-icon>
            {inputs.authors &&
              JSON.parse(inputs.authors).map((author, index) => (
                <div key={index}>
                  <p style={{ fontSize: "15px" }}>Name: {author.name}</p>
                  <p style={{ fontSize: "15px" }}>Role: {author.role}</p>
                </div>
              ))}
          </div>

          <div class="inputBox">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              required
              type="text"
              placeholder="Publication Date"
              readOnly
              value={inputs.publicationDate}
            ></input>
          </div>
          <div class="inputBox">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <textarea
              required
              type="text"
              readOnly
              placeholder="Abstract"
              value={inputs.abstract}
              rows="10"
              cols="50"
            ></textarea>
          </div>
          <div class="inputBox">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              required
              type="text"
              placeholder="URL"
              readOnly
              value={inputs.url}
            ></input>
          </div>
          <button
            className="closeModal"
            onClick={(e) => {
              navigate("/getResearchPaper");
            }}
          >
            CLOSE
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResearchPaper;
