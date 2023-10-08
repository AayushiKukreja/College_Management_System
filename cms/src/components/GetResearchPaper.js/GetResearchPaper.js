import React from "react";
import axios from "axios";
import Sidebar from "../Home/Sidebar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GetResearchpaper.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const GetResearchPaper = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [role, setRole] = useState("");
  const [researchData, setResearchData] = useState([]);
  const [show, setShow] = useState(true);
  let navigate = useNavigate();

  const searchBarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.1,
        ease: "easeOut",
      },
    },
  };

  const inputBarVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.1,
        ease: "easeOut",
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cellVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/db/research.php/")
      .then(function (response) {
        console.log(response);
        setResearchData(response.data);
      });
  }, []);

  function getUsers() {
    axios
      .get("http://localhost:8080/db/research.php/")
      .then(function (response) {
        console.log(response);
        setResearchData(response.data);
      });
  }
  const handleFind = () => {
    console.log(role);

    axios
      .get("http://localhost:8080/db/getResearch.php", {
        params: {
          keyword: role,
        },
      })
      .then((response) => {
        setResearchData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(researchData);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/db/research.php/${id}/delete`)
      .then(function (response) {
        console.log(response.data);
        role == "" ? getUsers() : handleFind();
      });
  };

  const handleSearch = () => {
    setShow(false);
    axios
      .get("http://localhost:8080/db/getResearch.php", {
        params: {
          keyword: searchKeyword,
        },
      })
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const truncateText = (text) => {
    return text.slice(0, 50) + (text.length > 20 ? "....." : "");
  };

  return (
    <>
      <Sidebar />
      <div className="header">
        <motion.div
          className="search-bar"
          variants={searchBarVariants}
          initial="hidden"
          animate="visible"
        >
          <input
            type="text"
            autoComplete="off"
            value={searchKeyword}
            placeholder="Enter PaperId"
            onChange={(event) => setSearchKeyword(event.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </motion.div>
        <motion.div
          className="input-bar"
          variants={inputBarVariants}
          initial="hidden"
          animate="visible"
        >
          <input
            type="text"
            placeholder="Get Data of Student/Teacher"
            autoComplete="off"
            name="role"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          />
          <button className="search-btn" onClick={handleFind}>
            Search
          </button>
        </motion.div>
      </div>
      <div className="table_responsive">
        <motion.table className="styled-table">
          <thead>
            <tr>
              <th>Paper Id</th>
              <th>Title</th>
              <th>Authors</th>
              <th>Publication Date</th>
              <th>Abstract</th>
              <th>Url</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <motion.tbody>
            {show &&
            searchKeyword == "" &&
            researchData == "No matching records found." ? (
              <motion.tr variants={rowVariants}>
                <td colSpan="8">
                  <h1>No Data found!!</h1>
                </td>
              </motion.tr>
            ) : (
              searchKeyword == "" &&
              researchData.map((user, key) => (
                <motion.tr
                  variants={rowVariants}
                  key={key}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.td variants={cellVariants}>
                    {researchData[key].paperId}
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    {researchData[key].title}
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    {researchData[key]?.authors}
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    {researchData[key]?.publicationDate}
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    {truncateText(researchData[key]?.abstract)}
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    <a
                      className="link"
                      href={researchData[key]?.url}
                      target="_blank"
                    >{`${researchData[key]?.url}`}</a>
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    {researchData[key]?.role}
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    <div class="action-btn">
                      <button
                        className="delete-button"
                        onClick={() => {
                          var userResponse = window.confirm(
                            "Do you want to continue?"
                          );

                          if (userResponse) {
                            deleteUser(researchData[key].id);
                            alert("You chose to continue.");
                          } else {
                            alert("You chose to cancel.");
                          }
                        }}
                      >
                        Delete
                      </button>

                      <Link to={`user/${user.id}/edit`} className="edit-link">
                        Open
                      </Link>
                    </div>
                  </motion.td>
                </motion.tr>
              ))
            )}
            {!show &&
            searchKeyword != "" &&
            searchResults == "No matching records found." ? (
              <motion.tr variants={rowVariants}>
                <td colSpan="8">
                  <h1>No Data found!!</h1>
                </td>
              </motion.tr>
            ) : (
              searchKeyword != "" &&
              searchResults.map((user, key) => (
                <motion.tr
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.td variants={cellVariants}>
                    {searchResults[0]?.paperId}
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    {searchResults[0]?.title}
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    {searchResults[0]?.authors}
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    {searchResults[0]?.publicationDate}
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    {searchResults[0]?.abstract}
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    {searchResults[0]?.url}
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    {searchResults[0]?.role}
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    <div class="action-btn">
                      <button
                        className="delete-button"
                        onClick={() => {
                          var userResponse = window.confirm(
                            "Do you want to continue?"
                          );

                          if (userResponse) {
                            deleteUser(searchResults.paperId);
                            alert("You chose to continue.");
                          } else {
                            alert("You chose to cancel.");
                          }
                        }}
                      >
                        Delete
                      </button>
                      <Link to={`user/${user.id}/edit`} className="edit-link">
                        Open
                      </Link>
                    </div>
                  </motion.td>
                </motion.tr>
              ))
            )}
          </motion.tbody>
        </motion.table>
      </div>
      <div>
        <button className="backButton" onClick={() => navigate("/research")}>
          Back
        </button>
      </div>
    </>
  );
};

export default GetResearchPaper;
