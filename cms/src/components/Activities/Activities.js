import React, { useState } from "react";
import axios from "axios";
import "./Activities.css";
import Sidebar from "../Home/Sidebar";
import { useEffect } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";

function Activities() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    datetime: "",
    location: "",
    organizer: "",
    photosVideos: [],
    dept: "",
  });

  const [facultyOptions, setFacultyOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/db/faculty.php/")
      .then((response) => {
        const usernames = response.data.map((user) => user.username);
        setFacultyOptions(usernames);
      })
      .catch((error) => {
        console.error("Error fetching faculty names:", error);
      });
  }, []);

  const handleFileUpload = (e) => {
    const files = e.target.files;
    const validTypes = ["image/jpeg", "image/png", "video/mp4"];

    const validFiles = Array.from(files).filter((file) =>
      validTypes.includes(file.type)
    );

    if (validFiles.length > 0) {
      setFormData({
        ...formData,
        photosVideos: [...formData.photosVideos, ...validFiles],
      });
    } else {
      alert("Please upload valid files (JPEG, PNG, or MP4).");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formData.photosVideos.forEach((file) => {
      formdata.append("photosVideos[]", file);
    });

    formdata.append("title", formData.title);
    formdata.append("description", formData.description);
    formdata.append("datetime", formData.datetime);
    formdata.append("location", formData.location);
    formdata.append("organizer", formData.organizer);
    formdata.append("dept", formData.dept);

    axios
      .post("http://localhost:8080/db/activities.php", formdata)
      .then((response) => {
        alert("Activity created successfully!", response.data);
      })
      .catch((error) => {
        console.error("Error creating activity:", error);
      });
  };

  return (
    <>
      <Sidebar />
      <form className="activity-form" onSubmit={handleSubmit}>
        <h1>Activity Form</h1>
        <label htmlFor="title">Title:</label>
        <select
          id="title"
          name="title"
          onChange={handleChange}
          value={formData.title}
          required
          autoComplete="off"
        >
          <option value="">Select...</option>
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
          <option value="Dance Activity">Dance Activity</option>
          <option value="Music Acitvity">Music Acitvity</option>
          <option value="Fest">Fest</option>
        </select>
        <br />

        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          value={formData.description}
          required
          autoComplete="off"
        ></textarea>
        <br />

        <label htmlFor="datetime">Date and Time:</label>
        <input
          type="datetime-local"
          id="datetime"
          name="datetime"
          onChange={handleChange}
          value={formData.datetime}
          required
          autoComplete="off"
        />
        <br />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          onChange={handleChange}
          value={formData.location}
          required
          autoComplete="off"
        />
        <br />

        <label htmlFor="organizer">Organizer:</label>
        <div className="dropdown">
          <select
            id="organizer"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
            autoComplete="off"
          >
            <option value="">Select an organizer...</option>
            {facultyOptions.map((faculty, index) => (
              <option key={index} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
        </div>

        <br />

        <label htmlFor="department">Department:</label>
        <select
          type="text"
          id="dept"
          name="dept"
          onChange={handleChange}
          value={formData.dept}
          required
          autoComplete="off"
        >
          <option value="">Select...</option>
          <option value="BTech">BTech</option>
          <option value="MTech">MTech</option>
          <option value="MSC">MSC</option>
          <option value="BSC">BSC</option>
        </select>
        <br />

        <label htmlFor="photosVideos">Photos/Videos:</label>
        <input
          type="file"
          id="photosVideos"
          name="photosVideos"
          accept="image/*, video/*"
          onChange={handleFileUpload}
          multiple
          required
          autoComplete="off"
        />

        <br />

        <button type="submit" className="acButton">
          Submit
        </button>
      </form>
    </>
  );
}

export default Activities;
