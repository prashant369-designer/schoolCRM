import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// public route
import Home from "../FullyPage/Home.jsx";
import Chatbot from "../Components/chatbot";
// admin panel
import AdminPanel from "../layouts/AdminPageLayout.jsx";
import Dashboard from "../panels/Admin/Dashboard.jsx";
import RegisterSST from "../panels/Admin/RegisterSST.jsx";
import AssignClassTeacher from "../panels/Admin/AssignClassTeacher.jsx";
import AssignClass from "../panels/Admin/AssignClass.jsx";
import FacultyDetails from "../panels/Admin/FacultyDetails.jsx";
import StudentDetails from "../panels/Admin/StudentDetails.jsx";
import StaffDetails from "../panels/Admin/StaffDetails.jsx";
import Awards from "../panels/Admin/Awards.jsx";
import TopPillars from "../panels/Admin/TopPillars.jsx";
import ProblemSubmit from "../panels/Admin/ProblemSubmission.jsx";
import Profile from "../panels/Admin/Profile.jsx";
import AcademicCalendar from "../panels/Admin/AcademiCalendar.jsx";
import Reports from "../panels/Admin/Reports.jsx";
import Error from "../panels/Admin/Error.jsx";
import Documnets from "../panels/Admin/docs.jsx";
import Totalclasses from "../panels/Admin/TotalClasses.jsx";
import TotalRooms from "../panels/Admin/TotalRooms.jsx";
import TotalSubjects from "../panels/Admin/TotalSubjects.jsx";
import TimeSlots from "../panels/Admin/TimeSlots.jsx";
import AdminNotification from "../panels/Admin/Notification.jsx";

// staff panel
import StaffPageLayout from "../layouts/StaffPageLayout.jsx";
import StaffDashboard from "../panels/Staff/Dashboard.jsx";
// student panel
import StudentDashboard from "../panels/Students/Dashboard.jsx";
import StudentPageLayout from "../layouts/StudentPageLayout.jsx";
import Myaccount from "../panels/Students/Myaccount.jsx";
import ProfilePrint from "../panels/Students/Profileprint.jsx";
import EventCalendar from "../panels/Students/EventCalendar.jsx";
import FeedbackForm from "../panels/Students/FeedbackForm.jsx";
import Notification from "../panels/Students/Notificatios.jsx";
import OnlineExam from "../panels/Students/OnlineExam.jsx";
import StudentProfile from "../panels/Students/Profile.jsx";
import SearchFaculty from "../panels/Students/SearchFaculty.jsx";
import ViewResult from "../panels/Students/ViewResult.jsx";
import PayFee from "../panels/Students/PayFee.jsx";

// teacher panel
import TeacherDashboard from "../panels/Teachers/Dashboard.jsx";
import TeacherPageLayout from "../layouts/TeacherPageLayout.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminPanel />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="registersst" element={<RegisterSST />} />
            <Route path="assignclassteacher" element={<AssignClassTeacher />} />
            <Route path="assignclass" element={<AssignClass />} />
            <Route path="facultydetails" element={<FacultyDetails />} />
            <Route path="studentdetails" element={<StudentDetails />} />
            <Route path="staffdetails" element={<StaffDetails />} />
            <Route path="awards" element={<Awards />} />
            <Route path="toppillars" element={<TopPillars />} />
            <Route path="problemsubmission" element={<ProblemSubmit />} />
            <Route path="profile" element={<Profile />} />
            <Route path="academiccalendar" element={<AcademicCalendar />} />
            <Route path="reports" element={<Reports />} />
            <Route path="error" element={<Error />} />
            <Route path="docs" element={<Documnets />} />
            <Route path="totalclasses" element={<Totalclasses />} />
            <Route path="totalrooms" element={<TotalRooms />} />
            <Route path="totalsubjects" element={<TotalSubjects />} />
            <Route path="timeslots" element={<TimeSlots />} />
            <Route path="notification" element={<AdminNotification />} />
          </Route>

          {/* Student Routes */}
          <Route path="/student" element={<StudentPageLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="myaccount" element={<Myaccount />} />
            <Route path="profileprint" element={<ProfilePrint />} />
            <Route path="eventcalendar" element={<EventCalendar />} />
            <Route path="feedbackform" element={<FeedbackForm />} />
            <Route path="notification" element={<Notification />} />
            <Route path="onlineexam" element={<OnlineExam />} />
            <Route path="studentprofile" element={<StudentProfile />} />
            <Route path="searchfaculty" element={<SearchFaculty />} />
            <Route path="viewresult" element={<ViewResult />} />
            <Route path="myfee" element={<PayFee />} />
          </Route>

          {/* Staff Routes */}
          <Route path="/staff" element={<StaffPageLayout />}>
            <Route index element={<StaffDashboard />} />
            <Route path="dashboard" element={<StaffDashboard />} />
          </Route>

          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherPageLayout />}>
            <Route index element={<TeacherDashboard />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
          </Route>

          {/* chatbot */}
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
