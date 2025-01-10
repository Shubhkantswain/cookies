// app/cookies.ts
import { createCookie } from "@remix-run/node";

export const userCookie = createCookie("user-session", {
  maxAge: 60 * 60 * 24, // 1 day
  httpOnly: true,
  secure: true,
  sameSite: "none",
});
