import React from "react";
import Sidebar from "../Home/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const GetHigherStudy = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8080/db/HigherStudy.php/")
      .then(function (response) {
        console.log(response);
        setUsers(response.data);
      });
  }, []);

  function getUsers() {
    axios
      .get("http://localhost:8080/db/HigherStudy.php/")
      .then(function (response) {
        console.log(response.data);
        setUsers(response.data);
      });
  }

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/db/HigherStudy.php/${id}/delete`)
      .then(function (response) {
        console.log(response.data);
        getUsers();
      });
  };

  const handleSearch = () => {
    setShow(false);
    axios
      .get("http://localhost:8080/db/search_job.php", {
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
  console.log(searchResults);
  return (
    <>
      <Sidebar />
      <div className="form-container">
        <input
          type="text"
          value={searchKeyword}
          placeholder="Enter EnrollmentId"
          onChange={(event) => setSearchKeyword(event.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="table_responsive">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Enrollment Id</th>
              <th>Email Id</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Passing Year</th>
              <th>DOB</th>
              <th>Course</th>
              <th>College</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchKeyword == "" &&
              users.map((user, key) => (
                <tr key={key}>
                  <td>{user.sname}</td>
                  <td>{user.enrollmentId}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.department}</td>
                  <td>{user.passingYear}</td>
                  <td>{user.dob}</td>
                  <td>{user.course}</td>
                  <td>{user.college}</td>
                  <td>
                    <div class="action-btn">
                      <Link to={`user/${user.id}/edit`} className="edit-link">
                        Edit
                      </Link>
                      <button
                        className="delete-button"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            {!show &&
            searchKeyword != "" &&
            searchResults == "No matching records found." ? (
              <h1>No Data found!!</h1>
            ) : (
              searchKeyword != "" &&
              searchResults.map((user, key) => (
                <tr>
                  <td>{searchResults[0]?.sname}</td>
                  <td>{searchResults[0]?.enrollmentId}</td>
                  <td>{searchResults[0]?.email}</td>
                  <td>{searchResults[0]?.gender}</td>
                  <td>{searchResults[0]?.department}</td>
                  <td>{searchResults[0]?.passingYear}</td>
                  <td>{searchResults[0]?.dob}</td>
                  <td>{searchResults[0]?.course}</td>
                  <td>{searchResults[0]?.college}</td>
                  <td>
                    <div class="action-btn">
                      <Link
                        to={`user/${searchResults[0].id}/edit`}
                        className="edit-link"
                      >
                        Edit
                      </Link>
                      <button
                        className="delete-button"
                        onClick={() => deleteUser(searchResults[0].id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div>
        <button
          className="backButton"
          onClick={() => navigate("/higherstudies")}
        >
          Back
        </button>
        <button className="forwardButton">Forward</button>
      </div>
    </>
  );
};

export default GetHigherStudy;
