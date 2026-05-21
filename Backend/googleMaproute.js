import express from "express";
import db from "./config/db.js";

const router = express.Router();

router.get("/route/:busrouteId", async (req, res) => {
  try {
    const busrouteId = req.params.busrouteId;

    const [students] = await db.query(
      `
      SELECT 
        rs.route_id,
        rs.busroute_id,
        rs.student_id,
        s.state,
        s.latitude,
        s.longitude,
        rs.pickup_order,
        rs.pickup_time
      FROM route_students rs
      JOIN student_contacts s 
        ON rs.student_id = s.student_id
      WHERE rs.busroute_id = ?
      ORDER BY rs.pickup_order ASC
      `,
      [busrouteId]
    );

    const [route] = await db.query(
      `
      SELECT 
        br.busroute_id,
        br.route_name,
        br.start_lat,
        br.start_lng,
        br.end_lat,
        br.end_lng,
        b.bus_number,
        b.driver_name,
        b.driver_phone
      FROM bus_routes br
      JOIN buses b 
        ON br.bus_id = b.bus_id
      WHERE br.busroute_id = ?
      `,
      [busrouteId]
    );

    if (route.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Bus route not found",
      });
    }

    res.json({
      success: true,
      route: route[0],
      school: {
        lat: Number(route[0].start_lat),
        lng: Number(route[0].start_lng),
      },
      endPoint: {
        lat: Number(route[0].end_lat),
        lng: Number(route[0].end_lng),
      },
      students,
    });
  } catch (error) {
    console.error("Transport route error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

export default router;