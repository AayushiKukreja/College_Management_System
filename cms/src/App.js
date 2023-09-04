import Login from "./components/Login/Login";
import Faculty from "./components/Faculty/Faculty";
import Facultyy from "./components/GetFaculty/Faculty";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditFaculty from "./components/EditFaculty/EditFaculty";
import Student from "./components/Student/Student";
import GetStudent from "./components/GetStudent/GetStudent";
import EditStudent from "./components/EditStudent/EditStudent";
import Internship from "./components/Internship/Internship";
import GetInternship from "./components/GetInternship/GetInternship";
import EditInternship from "./components/EditInternship/EditInternship";
import Job from "./components/Job/Job";
import GetJob from "./components/GetJob/GetJob";
import EditJob from "./components/EditJob/EditJob";
import HigherStudy from "./components/HigherStudy/HigherStudy";
import GetHigherStudy from "./components/GetHigherStudy/GetHigherStudy";
import EditStudy from "./components/EditStudy/EditStudy";
import Dashboard from "./components/Home/Dashboard";
import Research from "./components/ResearchPaper/Research";
import GetResearchPaper from "./components/GetResearchPaper.js/GetResearchPaper";
import ResearchPaper from "./components/OpenPaper/ResearchPaper";
import Workshop from "./components/Workshop/Workshop.js";
import ViewWorkshop from "./components/ViewWorkshop/ViewWorkshop";
import { useState, useEffect } from "react";
import Protected from "./components/Protected";
library.add(fas);

function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email != null) {
      setAuthUser(true);
    } else {
      setAuthUser(false);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <Protected authUser={authUser}>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/faculty"
            element={
              <Protected authUser={authUser}>
                <Faculty />
              </Protected>
            }
          />
          <Route
            path="/getFaculty"
            element={
              <Protected authUser={authUser}>
                <Facultyy />
              </Protected>
            }
          />
          <Route
            path="/getFaculty/user/:id/edit"
            element={
              <Protected authUser={authUser}>
                <EditFaculty />
              </Protected>
            }
          />
          <Route
            path="/student"
            element={
              <Protected authUser={authUser}>
                <Student />
              </Protected>
            }
          />
          <Route
            path="/getStudent"
            element={
              <Protected authUser={authUser}>
                <GetStudent />
              </Protected>
            }
          />
          <Route
            path="/getStudent/user/:id/edit"
            element={
              <Protected authUser={authUser}>
                <EditStudent />
              </Protected>
            }
          />
          <Route
            path="/internship"
            element={
              <Protected authUser={authUser}>
                <Internship />
              </Protected>
            }
          />
          <Route
            path="/getInternStudent"
            element={
              <Protected authUser={authUser}>
                <GetInternship />
              </Protected>
            }
          />
          <Route
            path="/getInternStudent/user/:id/edit"
            element={
              <Protected authUser={authUser}>
                <EditInternship />
              </Protected>
            }
          />
          <Route
            path="/job"
            element={
              <Protected authUser={authUser}>
                <Job />
              </Protected>
            }
          />
          <Route
            path="/getjob"
            element={
              <Protected authUser={authUser}>
                <GetJob />
              </Protected>
            }
          />
          <Route
            path="/getjob/user/:id/edit"
            element={
              <Protected authUser={authUser}>
                <EditJob />
              </Protected>
            }
          />
          <Route
            path="/higherstudies"
            element={
              <Protected authUser={authUser}>
                <HigherStudy />
              </Protected>
            }
          />
          <Route
            path="/getHigherStudyStudent"
            element={
              <Protected authUser={authUser}>
                <GetHigherStudy />
              </Protected>
            }
          />
          <Route
            path="/getHigherStudyStudent/user/:id/edit"
            element={
              <Protected authUser={authUser}>
                <EditStudy />
              </Protected>
            }
          />
          <Route
            path="/research"
            element={
              <Protected authUser={authUser}>
                <Research />
              </Protected>
            }
          />
          <Route
            path="/getResearchPaper"
            element={
              <Protected authUser={authUser}>
                <GetResearchPaper />
              </Protected>
            }
          />
          <Route
            path="/getResearchPaper/user/:id/edit"
            element={
              <Protected authUser={authUser}>
                <ResearchPaper />
              </Protected>
            }
          />
          <Route
            path="/workshop"
            element={
              <Protected authUser={authUser}>
                <Workshop />
              </Protected>
            }
          />
          <Route
            path="/viewWorkshop"
            element={
              <Protected authUser={authUser}>
                <ViewWorkshop />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
