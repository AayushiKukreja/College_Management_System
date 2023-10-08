import React, { useState } from "react";
import axios from "axios";
import "./Activities.css";
import Sidebar from "../Home/Sidebar";

function Activities() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    datetime: "",
    location: "",
    organizer: "",
    photosVideos: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setFormData({ ...formData, photosVideos: file });
    } else {
      alert("Please upload a JPEG or PNG image.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", formData.title);
    formdata.append("description", formData.description);
    formdata.append("datetime", formData.datetime);
    formdata.append("location", formData.location);
    formdata.append("organizer", formData.organizer);
    formdata.append("photosVideos", formData.photosVideos);

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
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          value={formData.title}
          required
          autoComplete="off"
        />
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
        <input
          type="text"
          id="organizer"
          name="organizer"
          onChange={handleChange}
          value={formData.organizer}
          required
          autoComplete="off"
        />
        <br />

        <label htmlFor="photosVideos">Photo:</label>
        <input
          type="file"
          id="photosVideos"
          name="photosVideos"
          accept="image/*, video/*"
          onChange={handleFileUpload}
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
