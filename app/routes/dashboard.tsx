// app/routes/dashboard.tsx
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { userCookie } from "~/cookies";

// Define the loader type
export const loader = async ({ request }: { request: Request }) => {
  // Get the cookies from the request headers
  const cookieHeader = request.headers.get("Cookie");

  // Parse the user session cookie
  const userSession = await userCookie.parse(cookieHeader);

  // If no session is found, redirect to login
  if (!userSession || !userSession.userId) {
    return redirect("/login");
  }

  // Return the user session to the frontend
  return json({ userId: userSession.userId });
};

// Dashboard component
export default function Dashboard() {
  const { userId } = useLoaderData<{ userId: string }>();

  return (
    <div>
      <h1>Welcome to your Dashboard!</h1>
      <p>Your User ID: {userId}</p>
    </div>
  );
}
