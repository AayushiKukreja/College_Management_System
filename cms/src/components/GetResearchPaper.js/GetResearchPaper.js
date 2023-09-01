import React from "react";
import axios from "axios";
import Sidebar from "../Home/Sidebar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GetResearchpaper.css";
import { Link } from "react-router-dom";

const GetResearchPaper = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [role, setRole] = useState("");
  const [researchData, setResearchData] = useState([]);
  const [show, setShow] = useState(true);
  let navigate = useNavigate();

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
        <div className="search-bar">
          <input
            type="text"
            autoComplete="off"
            value={searchKeyword}
            placeholder="Enter PaperId"
            onChange={(event) => setSearchKeyword(event.target.value)}
          />
          {/* Optional search button */}
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="input-bar">
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
        </div>
      </div>
      <div className="table_responsive">
        <table className="styled-table">
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
          <tbody>
            {show &&
            searchKeyword == "" &&
            researchData == "No matching records found." ? (
              <h1>No Data found!!</h1>
            ) : (
              searchKeyword == "" &&
              researchData.map((user, key) => (
                <tr key={key}>
                  <td>{researchData[key].paperId}</td>
                  <td>{researchData[key].title}</td>
                  <td>{researchData[key]?.authors}</td>
                  <td>{researchData[key]?.publicationDate}</td>
                  <td>{truncateText(researchData[key]?.abstract)}</td>
                  <td>
                    <a
                      className="link"
                      href={researchData[key]?.url}
                      target="_blank"
                    >{`${researchData[key]?.url}`}</a>
                  </td>
                  <td>{researchData[key]?.role}</td>
                  <td>
                    <div class="action-btn">
                      <button
                        className="delete-button"
                        onClick={() => deleteUser(researchData[key].id)}
                      >
                        Delete
                      </button>

                      <Link to={`user/${user.id}/edit`} className="edit-link">
                        Open
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
            {!show &&
            searchKeyword != "" &&
            searchResults == "No matching records found." ? (
              <h1>No Data found!!</h1>
            ) : (
              searchKeyword != "" &&
              searchResults.map((user, key) => (
                <tr>
                  <td>{searchResults[0]?.paperId}</td>
                  <td>{searchResults[0]?.title}</td>
                  <td>{searchResults[0]?.authors}</td>
                  <td>{searchResults[0]?.publicationDate}</td>
                  <td>{searchResults[0]?.abstract}</td>
                  <td>{searchResults[0]?.url}</td>
                  <td>{searchResults[0]?.role}</td>
                  <td>
                    <div class="action-btn">
                      <button
                        className="delete-button"
                        onClick={() => deleteUser(searchResults.paperId)}
                      >
                        Delete
                      </button>
                      <Link to={`user/${user.id}/edit`} className="edit-link">
                        Open
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
