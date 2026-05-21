import React, { useState } from "react";
import VideoCallPage from "./Assignments.jsx";

function TeacherDashboard() {
  const [callData, setCallData] = useState(null);

  const acceptStudentCall = async () => {
    const teacherId = 501;

    const channelName = "class_10_math";
    const uid = teacherId;

    const res = await fetch(
      `http://localhost:3000/api/video/agora-token?channelName=${channelName}&uid=${uid}`
    );

    const data = await res.json();
    setCallData(data);
  };

  if (callData) {
    return <VideoCallPage callData={callData} />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Teacher Panel</h1>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow">
        <h2 className="text-lg font-semibold">Incoming Student Call</h2>
        <p className="mt-2 text-gray-500">Student wants to join video call</p>

        <button
          onClick={acceptStudentCall}
          className="mt-4 rounded-xl bg-green-600 px-5 py-3 text-white"
        >
          Accept Video Call
        </button>
      </div>
    </div>
  );
}

export default TeacherDashboard;

