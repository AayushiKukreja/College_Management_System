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
library.add(fas);

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/getFaculty" element={<Facultyy />} />
          <Route path="/getFaculty/user/:id/edit" element={<EditFaculty />} />
          <Route path="/student" element={<Student />} />
          <Route path="/getStudent" element={<GetStudent />} />
          <Route path="/getStudent/user/:id/edit" element={<EditStudent />} />
          <Route path="/internship" element={<Internship />} />
          <Route path="/getInternStudent" element={<GetInternship />} />
          <Route
            path="/getInternStudent/user/:id/edit"
            element={<EditInternship />}
          />
          <Route path="/job" element={<Job />} />
          <Route path="/getjob" element={<GetJob />} />
          <Route path="/getjob/user/:id/edit" element={<EditJob />} />
          <Route path="/higherstudies" element={<HigherStudy />} />
          <Route path="/getHigherStudyStudent" element={<GetHigherStudy />} />
          <Route
            path="/getHigherStudyStudent/user/:id/edit"
            element={<EditStudy />}
          />
          <Route path="/research" element={<Research />} />
          <Route path="/getResearchPaper" element={<GetResearchPaper />} />
          <Route
            path="/getResearchPaper/user/:id/edit"
            element={<ResearchPaper />}
          />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/viewWorkshop" element={<ViewWorkshop />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
