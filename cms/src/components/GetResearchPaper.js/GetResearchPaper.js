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
        console.log(response.data);
        setResearchData(response.data);
      });
  }, []);

  function getUsers() {
    axios
      .get("http://localhost:8080/db/research.php/")
      .then(function (response) {
        console.log(response.data);
        setResearchData(response.data);
      });
  }
  console.log(researchData);
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/db/research.php/${id}/delete`)
      .then(function (response) {
        console.log(response.data);
        getUsers();
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
          <button
            className="search-btn bg-white hover:bg-gray-200  text-black  py-2 px-4 rounded text-sm"
            onClick={handleSearch}
          >
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
              <th>Actions</th>
            </tr>
          </thead>
          <motion.tbody>
            {!Array.isArray(researchData) && show && searchKeyword === "" ? (
              <motion.tr variants={rowVariants}>
                <td colSpan="8">
                  <h1>No Data found!!</h1>
                </td>
              </motion.tr>
            ) : (
              searchKeyword === "" &&
              Array.isArray(researchData) &&
              researchData?.map((user, key) => (
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
                  <motion.td variants={cellVariants} className="role">
                    {JSON.parse(researchData[key].authors).map(
                      (author, index) => (
                        <div key={index}>
                          <p style={{ fontSize: "15px" }}>
                            Name: {author.name}
                          </p>
                          <p style={{ fontSize: "15px" }}>
                            Role: {author.role}
                          </p>
                        </div>
                      )
                    )}
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
                    >
                      {`${researchData[key]?.url}`}
                    </a>
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    <div className="action-btn">
                      <button
                        className="delete-button bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
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

                      <Link
                        to={`user/${user.id}/edit`}
                        className="edit-link bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                      >
                        Open
                      </Link>
                    </div>
                  </motion.td>
                </motion.tr>
              ))
            )}
            {!show && searchKeyword !== "" && searchResults.length === 0 ? (
              <motion.tr variants={rowVariants}>
                <td colSpan="8">
                  <h1>No Data found!!</h1>
                </td>
              </motion.tr>
            ) : (
              searchKeyword !== "" &&
              searchResults.map((user, key) => (
                <motion.tr
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  key={key}
                >
                  <motion.td variants={cellVariants}>
                    {searchResults[0]?.paperId}
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    {searchResults[0]?.title}
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    {JSON.parse(searchResults[0]?.authors).map(
                      (author, index) => (
                        <div key={index}>
                          <p>Name: {author.name}</p>
                          <p>Role: {author.role}</p>
                        </div>
                      )
                    )}
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
                    <div className="action-btn">
                      <button
                        className="delete-button bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
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
                      <Link
                        to={`user/${user.id}/edit`}
                        className="edit-link bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                      >
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
        <button
          className="backButton bg-[#d3386c] hover:bg-[#a12953] text-white"
          onClick={() => navigate("/research")}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default GetResearchPaper;
