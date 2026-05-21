import dotenv from "dotenv";
dotenv.config();

// EXPRESS IMPORT
import express from "express";
import cors from "cors";
const app = express();

// aghora api
import agoraRoutes from "./aghora.js";
import googleMapRoutes from "./googleMaproute.js"
import exam from "./examRoutes.js";

// *************************************AUTH ROUTES importing******************************************
import studentAuthRoutes from "./routes/auth/studentauth.routes.js";
import staffAuthRoutes from "./routes/auth/staffauth.routes.js";
import teacherAuthRoutes from "./routes/auth/teacherauth.routes.js";

// **************************************STUDENT ROUTES IMPORTING*************************************
import studentRoutes from "./routes/StudentDetails.routes.js";
import studentContactInfoRoutes from "./routes/StudentContactInfo.routes.js";
import parentsDetailsRoutes from "./routes/parentsDetails.routes.js";
import StudentEducation from "./routes/StudentEducation.routes.js";
import StudentLibrary from "./routes/StudentLibrary.route.js";
import EmergencyContact from "./routes/EmergencyContact.routes.js";
import Documents from "./routes/Documents.routes.js";

// **************************************TEACHER ROUTES IMPORTING*************************************
import teacherRoutes from "./routes/Teacher.routes.js";
import teacherContactInfoRoutes from "./routes/teachercontactInfo.routes.js";
import teacherExperienceRoutes from "./routes/Teacherexperience.routes.js";

// **************************************TIMETABLE ROUTES IMPORTING*************************************
import ClassandSection from "./routes/ClassandSection.routes.js";
import ClassandSubject from "./routes/ClassandSubject.routes.js";
import TotalRooms from "./routes/TotalRooms.routes.js";
import TimeSlots from "./routes/TImeSlots.routes.js";
import TimetableRoutes from "./routes/Timetable.routes.js";

// **************************************COMMON ROUTES IMPORTING*************************************
import Notification from "./routes/Notification.route.js";
import EventCalendarRoutes from "./routes/EventCalendar.routes.js";

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// DEFAULT ROUTE
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// *************************************AUTH API'S******************************************
app.use("/api/auth/students", studentAuthRoutes);
app.use("/api/auth/staff", staffAuthRoutes);
app.use("/api/auth/teachers", teacherAuthRoutes);

// **************************************API FOR STUDENT*************************************
// api for student details
app.use("/api/studentsdetails", studentRoutes);
// api for student contact info
app.use("/api/studentcontactinfo", studentContactInfoRoutes);
// api for student parents details
app.use("/api/parentsdetails", parentsDetailsRoutes);
// api for student education
app.use("/api/studenteducation", StudentEducation);
// api for student library
app.use("/api/studentlibrary", StudentLibrary);
// api for student emergency contact
app.use("/api/emergencycontact", EmergencyContact);
// api for student documents
app.use("/api/documents", Documents);

// **************************************API FOR TEACHER***************************************
// api for teacher
app.use("/api/teachersdetails", teacherRoutes);
// api for teacher contact info
app.use("/api/teachercontactinfo", teacherContactInfoRoutes);
// api for teacher experience
app.use("/api/teacherexperience", teacherExperienceRoutes);

// **************************************API FOR TIMETABLE***************************************
// api for class and section
app.use("/api/classandsection", ClassandSection);
// api for class and subject
app.use("/api/classandsubject", ClassandSubject);
// api for total rooms
app.use("/api/totalrooms", TotalRooms);
// api for time slots
app.use("/api/timeslots", TimeSlots);
// api for timetable
app.use("/api/timetable", TimetableRoutes);

// **************************************COMMON API'S***************************************
// api for notification
app.use("/api/notifications", Notification);
// api for event calendar
app.use("/api/events", EventCalendarRoutes);

  // aghora api
  app.use("/api/video", agoraRoutes);
  // google map api
  app.use("/api/transport", googleMapRoutes);
  // exam
  app.use("/api/exam",exam);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
