import express from "express";
import pkg from "agora-access-token";

const { RtcTokenBuilder, RtcRole } = pkg;

const router = express.Router();

router.get("/agora-token", (req, res) => {
  const channelName = req.query.channelName || "class_10_math";
  const uid = 501; // You can use a fixed UID or generate one dynamically

  const appId = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;

  if (!appId || !appCertificate) {
    return res.status(500).json({ message: "Agora env missing" });
  }

  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );

  res.json({
    token,
    appId,
    channelName,
    uid,
  });
});

export default router;