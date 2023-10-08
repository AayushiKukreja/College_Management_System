import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Facultyy.css";
import Sidebar from "../Home/Sidebar";
import { motion } from "framer-motion";

function Faculty() {
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [show, setShow] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8080/db/faculty.php/")
      .then(function (response) {
        console.log(response);
        setUsers(response.data);
      });
  }, []);

  function getUsers() {
    axios
      .get("http://localhost:8080/db/faculty.php/")
      .then(function (response) {
        console.log(response.data);
        setUsers(response.data);
      });
  }
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/db/faculty.php/${id}/delete`)
      .then(function (response) {
        console.log(response.data);
        getUsers();
      });
  };
  const handleSearch = () => {
    setShow(false);
    axios
      .get("http://localhost:8080/db/searchFaculty.php", {
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

      <motion.div
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 10,
          duration: 1.1,
        }}
      >
        <div className="form-container">
          <input
            type="text"
            value={searchKeyword}
            placeholder="Enter EmployeeId"
            onChange={(event) => setSearchKeyword(event.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </motion.div>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 10,
          duration: 9.5,
        }}
        className="table_responsive"
      >
        <motion.table
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            duration: 9.5,
          }}
          className="styled-table"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Employee Id</th>
              <th>Email Id</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Higher Study</th>
              <th>DOB</th>
              <th>Designation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {show && searchKeyword == "" && users == "No data found." ? (
              <td colSpan="8">
                <h1>No Data found!!</h1>
              </td>
            ) : (
              searchKeyword == "" &&
              users?.map((user, key) => (
                <tr key={key}>
                  <td>{user.username}</td>
                  <td>{user.employeeId}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.department}</td>
                  <td>{user.higher_study}</td>
                  <td>{user.dob}</td>
                  <td>{user.designation}</td>
                  <td>
                    <div class="action-btn">
                      <Link to={`user/${user.id}/edit`} className="edit-link">
                        Edit
                      </Link>
                      <button
                        className="delete-button"
                        onClick={() => {
                          var userResponse = window.confirm(
                            "Do you want to continue?"
                          );

                          if (userResponse) {
                            deleteUser(user.id);
                            alert("You chose to continue.");
                          } else {
                            alert("You chose to cancel.");
                          }
                        }}
                      >
                        Delete
                      </button>
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
                  <td>{searchResults[0]?.username}</td>
                  <td>{searchResults[0]?.employeeId}</td>
                  <td>{searchResults[0]?.email}</td>
                  <td>{searchResults[0]?.gender}</td>
                  <td>{searchResults[0]?.department}</td>
                  <td>{searchResults[0]?.higher_study}</td>
                  <td>{searchResults[0]?.dob}</td>
                  <td>{searchResults[0]?.designation}</td>
                  <td>
                    <div class="action-btn">
                      <Link
                        to={`user/${searchResults[0]?.id}/edit`}
                        className="edit-link"
                      >
                        Edit
                      </Link>
                      <button
                        className="delete-button"
                        onClick={() => {
                          var userResponse = window.confirm(
                            "Do you want to continue?"
                          );

                          if (userResponse) {
                            deleteUser(searchResults[0]?.id);
                            alert("You chose to continue.");
                          } else {
                            alert("You chose to cancel.");
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </motion.table>
      </motion.div>

      <div>
        <button className="backButton" onClick={() => navigate("/faculty")}>
          Back
        </button>
      </div>
    </>
  );
}

export default Faculty;
