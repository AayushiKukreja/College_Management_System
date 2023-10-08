import React from "react";
import Sidebar from "../Home/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const GetJob = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/db/job.php/").then(function (response) {
      console.log(response);
      setUsers(response.data);
    });
  }, []);

  function getUsers() {
    axios.get("http://localhost:8080/db/job.php/").then(function (response) {
      console.log(response.data);
      setUsers(response.data);
    });
  }

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/db/job.php/${id}/delete`)
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
            placeholder="Enter name"
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
              <th>Enrollment Id</th>
              <th>Email Id</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Passing Year</th>
              <th>DOB</th>
              <th>Package</th>
              <th>Company</th>
              <th>DOJ</th>
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
              users.map((user, key) => (
                <tr key={key}>
                  <td>{user.sname}</td>
                  <td>{user.enrollmentId}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.department}</td>
                  <td>{user.passingYear}</td>
                  <td>{user.dob}</td>
                  <td>{user.package}</td>
                  <td>{user.company}</td>
                  <td>{user.doj}</td>
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
                  <td>{searchResults[0]?.sname}</td>
                  <td>{searchResults[0]?.enrollmentId}</td>
                  <td>{searchResults[0]?.email}</td>
                  <td>{searchResults[0]?.gender}</td>
                  <td>{searchResults[0]?.department}</td>
                  <td>{searchResults[0]?.passingYear}</td>
                  <td>{searchResults[0]?.dob}</td>
                  <td>{searchResults[0]?.package}</td>
                  <td>{searchResults[0]?.company}</td>
                  <td>{searchResults[0]?.doj}</td>
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
                        onClick={() => {
                          var userResponse = window.confirm(
                            "Do you want to continue?"
                          );

                          if (userResponse) {
                            deleteUser(searchResults[0].id);
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
        <button className="backButton" onClick={() => navigate("/job")}>
          Back
        </button>
      </div>
    </>
  );
};

export default GetJob;
