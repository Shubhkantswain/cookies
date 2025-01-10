// app/routes/signup.tsx
import { json, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { userCookie } from "~/cookies";

// Loader for handling GET requests
export const loader = async () => {
  return json({ message: "Signup page loaded successfully" });
};

// Action for handling POST requests
export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  // Mock signup logic
  const userId = await signupUser(username, password);

  if (!userId) {
    return json({ error: "Signup failed" }, { status: 400 });
  }

  // Set the cookie with the user ID or session token
  const cookieHeader = await userCookie.serialize({ userId });

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": cookieHeader,
    },
  });
};

// Mock signup function
async function signupUser(username: any, password: any) {
  return "new-user-id-for-testing"; // Replace with real signup logic
}

export default function Signup() {
  const actionData = useActionData();
  return (
    <div>
      <h1>Signup</h1>
      <Form method="post">
        <div>
          <label>
            Username: <input type="text" name="username" />
          </label>
        </div>
        <div>
          <label>
            Password: <input type="password" name="password" />
          </label>
        </div>
        <button type="submit">Sign Up</button>
      </Form>
      {/* {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>} */}
    </div>
  );
}
