import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Home/Sidebar";
import "./Activities.css";
//import "../styles/tailwind.css";

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
      <form className="activity-form p-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl mb-4 font-bold">Activity Form</h1>
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold mb-1">
            Title:
          </label>
          <select
            id="title"
            name="title"
            onChange={handleChange}
            value={formData.title}
            required
            autoComplete="off"
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="">Select...</option>
            <option value="Conference">Conference</option>
            <option value="Workshop">Workshop</option>
            <option value="Dance Activity">Dance Activity</option>
            <option value="Music Acitvity">Music Acitvity</option>
            <option value="Fest">Fest</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold mb-1">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            value={formData.description}
            required
            autoComplete="off"
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="datetime" className="block font-semibold mb-1">
            Date and Time:
          </label>
          <input
            type="datetime-local"
            id="datetime"
            name="datetime"
            onChange={handleChange}
            value={formData.datetime}
            required
            autoComplete="off"
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block font-semibold mb-1">
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            onChange={handleChange}
            value={formData.location}
            required
            autoComplete="off"
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="organizer" className="block font-semibold mb-1">
            Organizer:
          </label>
          <div className="relative">
            <select
              id="organizer"
              name="organizer"
              value={formData.organizer}
              onChange={handleChange}
              autoComplete="off"
              className="border border-gray-300 p-2 pr-8 rounded w-full appearance-none"
            >
              <option value="">Select an organizer...</option>
              {facultyOptions.map((faculty, index) => (
                <option key={index} value={faculty}>
                  {faculty}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="dept" className="block font-semibold mb-1">
            Department:
          </label>
          <select
            type="text"
            id="dept"
            name="dept"
            onChange={handleChange}
            value={formData.dept}
            required
            autoComplete="off"
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="">Select...</option>
            <option value="BTech">BTech</option>
            <option value="MTech">MTech</option>
            <option value="MSC">MSC</option>
            <option value="BSC">BSC</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="photosVideos" className="block font-semibold mb-1">
            Photos:
          </label>
          <input
            type="file"
            id="photosVideos"
            name="photosVideos"
            accept="image/*, video/*"
            onChange={handleFileUpload}
            multiple
            required
            autoComplete="off"
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="acButton py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default Activities;
