import { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";

export default function TransportMap() {
  const [routeData, setRouteData] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
  });
  const base_url = import.meta.env.VITE_API_URL;  

  useEffect(() => {
    fetch(`${base_url}/transport/route/1`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRouteData(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (!isLoaded) return <p>Loading map...</p>;
  if (!routeData) return <p>Loading route...</p>;

  const school = routeData.school;
  const endPoint = routeData.endPoint;

  const students = routeData.students.map((student) => ({
    id: student.student_id,
    name: student || "Student",
    lat: Number(student.latitude),
    lng: Number(student.longitude),
    pickup_order: Number(student.pickup_order),
  }));

  const routePath = [
    school,
    ...students.map((s) => ({
      lat: s.lat,
      lng: s.lng,
    })),
    endPoint,
  ];

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "600px" }}
      center={school}
      zoom={8}
    >
      <Marker position={school} label="School" />

      {students.map((student) => (
        <Marker
          key={student.id}
          position={{ lat: student.lat, lng: student.lng }}
          label={`${student.pickup_order}`}
          title={student.name}
        />
      ))}

      <Marker position={endPoint} label="End" />

      <Polyline
        path={routePath}
        options={{
          strokeWeight: 4,
        }}
      />
    </GoogleMap>
  );
}