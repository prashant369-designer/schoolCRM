import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// public route
import Home from "../FullyPage/Home.jsx";
import Chatbot from "../Components/chatbot";
// private route
import PrivateRoute from "./PrivateRoute.jsx";
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
import LeaveRequest from "../panels/Students/LeaveRequest.jsx";
import StudyMaterial from "../panels/Students/StudyMaterial.jsx";
import StudentAssignments from "../panels/Students/Assignments.jsx";
import VideoCallStudent from "../panels/Students/VideoCallStudent.jsx";

// teacher panel
import TeacherDashboard from "../panels/Teachers/Dashboard.jsx";
import TeacherPageLayout from "../layouts/TeacherPageLayout.jsx";
import Assignments from "../panels/Teachers/Assignments.jsx";
import AttendanceManagement from "../panels/Teachers/AttendanceManagement.jsx";
import DocumentsResources from "../panels/Teachers/DocumentsResources.jsx";
import ExamsMarks from "../panels/Teachers/Exams&Marks.jsx";
import LeaveManagement from "../panels/Teachers/LeaveManagement.jsx";
import Myprofile from "../panels/Teachers/Myprofile.jsx";
import MyTimetable from "../panels/Teachers/MyTimetable.jsx";
import Settings from "../panels/Teachers/Settings.jsx";
import StudentManagement from "../panels/Teachers/StudentManagement.jsx";
import VideoCallTeacher from "../panels/Teachers/VideoCallTeacher.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminPanel />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="registersst" element={<RegisterSST />} />
              <Route
                path="assignclassteacher"
                element={<AssignClassTeacher />}
              />
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
          </Route>

          {/* Student Routes */}
          <Route element={<PrivateRoute allowedRoles={["student"]} />}>
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
              <Route path="leave" element={<LeaveRequest />} />
              <Route path="studymaterial" element={<StudyMaterial />} />
              <Route path="assignments" element={<StudentAssignments />} />
              <Route path="videocallstudent" element={<VideoCallStudent />} />
            </Route>
          </Route>

          {/* Staff Routes */}
          <Route path="/staff" element={<StaffPageLayout />}>
            <Route index element={<StaffDashboard />} />
            <Route path="dashboard" element={<StaffDashboard />} />
          </Route>

          {/* Teacher Routes */}
          <Route element={<PrivateRoute allowedRoles={["teacher"]} />}>
            <Route path="/teacher" element={<TeacherPageLayout />}>
              <Route index element={<TeacherDashboard />} />
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="attendance" element={<AttendanceManagement />} />
              <Route path="documents" element={<DocumentsResources />} />
              <Route path="exams" element={<ExamsMarks />} />
              <Route path="leave" element={<LeaveManagement />} />
              <Route path="myprofile" element={<Myprofile />} />
              <Route path="timetable" element={<MyTimetable />} />
              <Route path="settings" element={<Settings />} />
              <Route path="studentmanagement" element={<StudentManagement />} />
              <Route path="videocallteacher" element={<VideoCallTeacher />} />
            </Route>
          </Route>

          {/* chatbot */}
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
