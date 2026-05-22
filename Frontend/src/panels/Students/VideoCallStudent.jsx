import React, { useState } from "react";
import axios from "axios";
import {
  AgoraRTCProvider,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
  RemoteUser,
  LocalVideoTrack,
} from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import { useEffect } from "react";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

function VideoRoom({ appId, channelName, token, uid, onLeave }) {
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  useJoin({
    appid: appId,
    channel: channelName,
    token,
    uid,
  });

  usePublish(
    localMicrophoneTrack && localCameraTrack
      ? [localMicrophoneTrack, localCameraTrack]
      : [],
  );

  const remoteUsers = useRemoteUsers();

  const toggleMic = async () => {
    if (localMicrophoneTrack) {
      await localMicrophoneTrack.setEnabled(!micOn);
    }
    setMicOn(!micOn);
  };

  const toggleCamera = async () => {
    if (localCameraTrack) {
      await localCameraTrack.setEnabled(!cameraOn);
    }
    setCameraOn(!cameraOn);
  };

  const leaveCall = async () => {
    localMicrophoneTrack?.close();
    localCameraTrack?.close();
    await client.leave();
    onLeave();
  };

  usePublish([
  localMicrophoneTrack,
  localCameraTrack,
].filter(Boolean));

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-white">
      <div className="mb-4 flex items-center justify-between rounded-2xl bg-slate-900 p-4">
        <div>
          <h2 className="text-xl font-bold">Live Class</h2>
          <p className="text-sm text-slate-400">Channel: {channelName}</p>
        </div>

        <span className="rounded-full bg-green-600 px-4 py-1 text-sm font-semibold">
          Live
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="relative h-72 overflow-hidden rounded-2xl bg-black">
          {cameraOn && localCameraTrack ? (
            <LocalVideoTrack
              track={localCameraTrack}
              play
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400">
              Camera Off
            </div>
          )}

          <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-3 py-1 text-sm">
            You
          </div>
        </div>

        {remoteUsers.length === 0 ? (
          <div className="flex h-72 items-center justify-center rounded-2xl bg-slate-900 text-slate-400">
            Waiting for students/teacher to join...
          </div>
        ) : (
          remoteUsers.map((user) => (
            <div
              key={user.uid}
              className="relative h-72 overflow-hidden rounded-2xl bg-black"
            >
              <RemoteUser
                user={user}
                playVideo={true}
                playAudio={true}
                className="h-full w-full object-cover"
              />

              <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-3 py-1 text-sm">
                User: {user.uid}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="fixed bottom-6 left-1/2 flex -translate-x-1/2 gap-4 rounded-2xl bg-slate-900 p-4 shadow-xl">
        <button
          onClick={toggleMic}
          className={`rounded-full p-4 ${
            micOn ? "bg-slate-700" : "bg-red-600"
          }`}
        >
          {micOn ? <Mic /> : <MicOff />}
        </button>

        <button
          onClick={toggleCamera}
          className={`rounded-full p-4 ${
            cameraOn ? "bg-slate-700" : "bg-red-600"
          }`}
        >
          {cameraOn ? <Video /> : <VideoOff />}
        </button>

        <button onClick={leaveCall} className="rounded-full bg-red-600 p-4">
          <PhoneOff />
        </button>
      </div>
    </div>
  );
}

export default function VideoCallPage({ callData: externalCallData }) {
  const [callData, setCallData] = useState(externalCallData || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const base_url = import.meta.env.VITE_API_URL;  


  const startCall = async () => {
    try {
      setLoading(true);
      setError("");
      const teacherId = 501;
      const channelName = "class_10_math";
      const uid = teacherId;
      

      const res = await fetch(
        `${base_url}/video/agora-token?channelName=${channelName}&uid=${uid}`,
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to join class");
      }

      setCallData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const leaveCall = () => {
    setCallData(null);
  };

  return (
    <AgoraRTCProvider client={client}>
      {!callData ? (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
            <h1 className="mb-2 text-2xl font-bold text-slate-800">
              School Live Class
            </h1>

            <p className="mb-6 text-slate-500">
              Join your online class with camera and microphone.
            </p>

            {error && (
              <p className="mb-4 rounded-xl bg-red-100 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              onClick={startCall}
              disabled={loading}
              className="w-full rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Joining..." : "Join Video Class"}
            </button>
          </div>
        </div>
      ) : (
        <VideoRoom {...callData} onLeave={leaveCall} />
      )}
    </AgoraRTCProvider>
  );
}
