import { useState } from "react";
import { useAuth } from "./AuthContext";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();

  const [error, setError] = useState(null);

  const tryRegister = async (formData) => {
    setError(null);

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await register({ firstName, lastName, email, password });
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Register for an account</h1>
      <form action={tryRegister}>
        <label>
          First Name
          <input type="text" name="firstName" required />
        </label>
        <label>
          Last Name
          <input type="text" name="lastName" required />
        </label>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Register</button>
        {error && <p role="alert">{error}</p>}
      </form>
    </>
  );
}
