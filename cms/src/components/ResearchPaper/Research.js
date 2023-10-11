import React from "react";
import { useState } from "react";
import "./Research.css";
import Sidebar from "../Home/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Research = () => {
  const [paperId, setPaperId] = useState("");
  const [title, setTitle] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [abstract, setAbstract] = useState("");
  const [url, setUrl] = useState("");
  const [showDropdown, setShowDropdown] = useState([true]);
  const [authorsList, setAuthorsList] = useState([{ name: "", role: "" }]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  let navigate = useNavigate();

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };
  const addAuthorField = () => {
    setAuthorsList([...authorsList, { name: "", role: "student" }]); // Added role: "student"
    setShowDropdown([...showDropdown, true]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      paperId == "" ||
      title == "" ||
      selectedAuthors == "" ||
      publicationDate == "" ||
      abstract == "" ||
      url == ""
    ) {
      alert("Please Fill The Form Completely!!");
    } else {
      const fData = new FormData();
      fData.append("paperId", paperId);
      fData.append("title", title);
      fData.append("authors", JSON.stringify(authorsList));
      fData.append("publicationDate", publicationDate);
      fData.append("abstract", abstract);
      fData.append("url", url);
      console.log(fData);
      axios({
        method: "post",
        url: "http://localhost:8080/db/research.php",
        data: fData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then(function (response) {
          console.log(response);
          alert(response.data);
        })
        .catch(function (response) {
          alert("ERRORR!!!!");
        });
    }
  };

  const handleAuthorRoleChange = (e, index) => {
    const role = e.target.value;
    console.log(`Role: ${role}`);
    const updatedAuthors = [...authorsList];
    updatedAuthors[index] = { ...updatedAuthors[index], role: role };
    console.log(updatedAuthors);
    setAuthorsList(updatedAuthors);
  };

  const fetchAuthors = async (partialName, index) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/db/getAuthors.php?partialName=${partialName}`
      );
      const authorNamesArray = response.data;
      const updatedAuthors = [...authorsList];
      updatedAuthors[index].names = authorNamesArray.filter(
        (authorName) => authorName !== updatedAuthors[index].name
      );
      setAuthorsList(updatedAuthors);
    } catch (error) {
      console.error("Error fetching authors: ", error);
    }
  };

  const handleAuthorInputChange = (e, index) => {
    const partialName = e.target.value;
    const updatedAuthors = [...authorsList];
    updatedAuthors[index].name = partialName;
    setAuthorsList(updatedAuthors);
    fetchAuthors(partialName, index);
  };

  const handleAuthorSelection = (authorName, index) => {
    const updatedAuthors = [...authorsList];
    updatedAuthors[index].name = authorName;
    setAuthorsList(updatedAuthors);
    const updatedDropdownVisibility = [...showDropdown];
    updatedDropdownVisibility[index] = false;
    setShowDropdown(updatedDropdownVisibility);

    const role = authorsList[index].role;
    const updatedSelectedAuthors = [
      ...selectedAuthors,
      { name: authorName, role: role },
    ];
    setSelectedAuthors(updatedSelectedAuthors);
  };

  const handleAuthorDelete = (index) => {
    const deletedAuthor = authorsList[index].name;
    const updatedAuthors = [...authorsList];
    updatedAuthors.splice(index, 1);
    setAuthorsList(updatedAuthors);

    const updatedDropdownVisibility = [...showDropdown];
    updatedDropdownVisibility.splice(index, 1);
    setShowDropdown(updatedDropdownVisibility);

    const updatedSelectedAuthors = selectedAuthors.filter(
      (author) => author !== deletedAuthor
    );
    setSelectedAuthors(updatedSelectedAuthors);
  };

  return (
    <>
      <Sidebar />
      <div className="research">
        <motion.h2
          className="researchTitle"
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          Add Research Paper Record
        </motion.h2>
        <motion.form
          className="paper-form"
          onSubmit={handleSubmit}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="form-group">
            <label htmlFor="paperId">Paper Id:</label>
            <input
              required
              type="text"
              name="paperId"
              onChange={(e) => {
                setPaperId(e.target.value);
              }}
              id="paperId"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              required
              type="text"
              autoComplete="off"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              id="title"
            />
          </div>
          {authorsList.map((author, index) => (
            <div className="form-group" key={index}>
              <label htmlFor={`author-${index}`}>Author {index + 1}:</label>
              <div className="author-input">
                <input
                  required
                  type="text"
                  name={`author-${index}`}
                  autoComplete="off"
                  value={author.name}
                  onChange={(e) => handleAuthorInputChange(e, index)}
                />
                {index === authorsList.length - 1 && (
                  <button
                    type="button"
                    onClick={addAuthorField}
                    style={{ margin: "0 5px" }}
                  >
                    +
                  </button>
                )}
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleAuthorDelete(index)}
                    style={{ margin: "0 5px" }}
                  >
                    Delete
                  </button>
                )}
                <select
                  value={author.role}
                  onChange={(e) => handleAuthorRoleChange(e, index)}
                >
                  <option value="">Select..</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>
              {showDropdown[index] &&
                author &&
                author.name &&
                Array.isArray(author.names) &&
                author.names.length > 0 && (
                  <ul className="author-dropdown">
                    {author.names.map((authorName) => (
                      <li
                        key={authorName}
                        onClick={() => handleAuthorSelection(authorName, index)}
                      >
                        {authorName}
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          ))}

          <div className="form-group">
            <label htmlFor="publicationDate">Publication Date:</label>
            <input
              required
              type="date"
              name="publicationDate"
              onChange={(e) => {
                setPublicationDate(e.target.value);
              }}
              id="publicationDate"
            />
          </div>
          <div className="form-group">
            <label htmlFor="abstract">Abstract:</label>
            <textarea
              required
              name="abstract"
              autoComplete="off"
              onChange={(e) => {
                setAbstract(e.target.value);
              }}
              id="abstract"
              rows="5"
              cols="80"
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">URL:</label>
            <input
              type="text"
              name="url"
              required
              autoComplete="off"
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              id="url"
            />
          </div>
          <div className="button-Container">
            <motion.button
              style={{ margin: "0 5px" }}
              type="submit"
              className="submitButton"
              id="sumbit"
              name="submit"
              value="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Submit Record
            </motion.button>
            <motion.button
              className="resetButton"
              onClick={() => {
                navigate("/getResearchPaper");
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              List Records
            </motion.button>
          </div>
        </motion.form>
      </div>
    </>
  );
};

export default Research;
